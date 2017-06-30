import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../models/action';
import { ListConfig } from './list-config';
import { ListEvent } from './list-event';

import { cloneDeep, defaults, isEqual, without } from 'lodash';

/**
 * List component
 *
 * For items, use a template named itemTemplate to contain content for each row. For each item in the items array, the
 * expansion can be disabled by setting disabled to true on the item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each row. If using expanding rows, use a template
 * named itemExpandedTemplate to contain expandable content for each row.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-list',
  styleUrls: ['./list.component.less'],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  /**
   * The name of the template containing actions for each row
   */
  @Input() actionTemplate: TemplateRef<any>;

  /**
   * The list config containing component properties
   */
  @Input() config: ListConfig;

  /**
   * The name of the template used to contain expandable content for each row
   */
  @Input() itemExpandedTemplate: TemplateRef<any>;

  /**
   * An array of items to display in the list
   */
  @Input() items: any[];

  /**
   * The name of the template containing items for each row
   */
  @Input() itemTemplate: TemplateRef<any>;

  /**
   * The event emitted when an action (e.g., button, kebab, etc.) has been selected
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  /**
   * The event emitted when a checkbox has been selected
   */
  @Output('onCheckboxChange') onCheckboxChange = new EventEmitter();

  /**
   * The event emitted when an item has been clicked
   */
  @Output('onClick') onClick = new EventEmitter();

  /**
   * The event emitted when an item is double clicked
   */
  @Output('onDblClick') onDblClick = new EventEmitter();

  /**
   * The event emitted when an item is no longer dragged
   */
  // @Output('onDragEnd') onDragEnd = new EventEmitter();

  /**
   * The event emitted when an item is being dragged
   */
  // @Output('onDragMoved') onDragMoved = new EventEmitter();

  /**
   * The event emitted when an item begins to be dragged
   */
  // @Output('onDragStart') onDragStart = new EventEmitter();

  /**
   * The event emitted when an item has been selected
   */
  @Output('onSelect') onSelect = new EventEmitter();

  /**
   * The event emitted when an item selection has been changed
   */
  @Output('onSelectionChange') onSelectionChange = new EventEmitter();

  private defaultConfig = {
    selectItems: false,
    multiSelect: false,
    dblClick: false,
    dragEnabled: false,
    selectedItems: [],
    selectionMatchProp: 'uuid',
    checkDisabled: false,
    useExpandingRows: false,
    showCheckbox: true
  } as ListConfig;
  private dragItem: any;
  private itemsEmpty: boolean = true;
  private prevConfig: ListConfig;

  /**
   * The default constructor
   */
  constructor() {
  }

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
  }

  /**
   *  Check if the component config has changed
   */
  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
    this.itemsEmpty = !(this.items !== undefined && this.items.length > 0);
  }

  private setupConfig(): void {
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }
    if ((this.config.multiSelect === undefined || this.config.multiSelect === false)
        && this.config.selectedItems && this.config.selectedItems.length > 0) {
      this.config.selectedItems = [this.config.selectedItems[0]];
    }
    if (this.config.selectItems && this.config.showCheckbox) {
      throw new Error('ListComponent - Illegal use: ' +
        'Cannot use both item select and click selection at the same time.');
    }
    this.prevConfig = cloneDeep(this.config);
  }

  // Actions

  private handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }

  // Checkbox

  private checkboxChange(item: any): void {
    this.onCheckboxChange.emit({
      item: item
    } as ListEvent);
  }

  private isSelected(item: any): boolean {
    let matchProp = this.config.selectionMatchProp;
    let selected = false;

    if (this.config.showCheckbox) {
      selected = item.selected;
    } else if (this.config.selectItems !== undefined) {
      this.config.selectedItems.forEach((itemObj) => {
        if (itemObj[matchProp] === item[matchProp]) {
          selected = true;
        }
      });
    }
    return selected;
  }

  // Drag and drop

  private dragEnd(): void {
    /* Todo: dnd not implemeneted
    this.onDragEnd.emit({
      item: this.dragItem
    } as ListEvent);
    */
  }

  private dragMoved(): void {
    /* Todo: dnd not implemeneted
    this.onDragMoved.emit({
      item: this.dragItem
    } as ListEvent);
    */
  }

  private isDragOriginal(item: any): boolean {
    return (item === this.dragItem);
  }

  private dragStart(item: any): void {
    this.dragItem = item;
    /* Todo: dnd not implemeneted
    this.onDragStart.emit({
      item: this.dragItem
    } as ListEvent);
    */
  }

  // Item Selection

  private itemClick($event: MouseEvent, item: any): void {
    let alreadySelected;
    let selectionChanged = false;

    // Ignore disabled item clicks completely
    if (item.disabled === true) {
      return;
    }

    if (this.config.selectItems) {
      if (this.config.multiSelect && !this.config.dblClick) {
        for (let i = 0; i < this.config.selectedItems.length - 1; i++) {
          if (this.config.selectedItems[i] === item) {
            alreadySelected = true;
            break;
          }
        }
        if (alreadySelected) {
          // already selected so deselect
          this.config.selectedItems = without(this.config.selectedItems, item);
        } else {
          // add the item to the selected items
          this.config.selectedItems.push(item);
          selectionChanged = true;
        }
      } else {
        if (this.config.selectedItems[0] === item) {
          if (!this.config.dblClick) {
            this.config.selectedItems = [];
            selectionChanged = true;
          }
        } else {
          this.config.selectedItems = [item];
          selectionChanged = true;
        }
      }

      if (selectionChanged === true) {
        this.onSelect.emit({
          item: item
        } as ListEvent);
        this.onSelectionChange.emit({
          item: item,
          selectedItems: this.config.selectedItems
        } as ListEvent);
      }
    }
    this.onClick.emit({
      item: item
    } as ListEvent);
  }

  private dblClick($event: MouseEvent, item: any): void {
    // Ignore disabled item clicks
    if (this.config.dblClick === true && item.disabled !== true) {
      this.onDblClick.emit({
        item: item
      } as ListEvent);
    }
  }

  // Toggle

  private closeExpandingRow(item: any): void {
    item.expandingRowId = undefined;
    item.isRowExpanded = false;
  }

  private toggleExpandingRow(item: any): void {
    // Row may already be open due to compound expansion
    if (item.isRowExpanded && item.expandingRowId !== undefined) {
      item.expandingRowId = undefined;
      return;
    }
    item.expandingRowId = undefined;
    item.isRowExpanded = !item.isRowExpanded;
  }
}
