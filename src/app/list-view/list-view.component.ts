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
import { ListViewConfig } from './list-view-config';
import { ListViewEvent } from './list-view-event';

import { cloneDeep, defaults, isEqual, without } from 'lodash';

/**
 * List view component
 *
 * For items, use a template named itemTemplate to contain content for each row. For each item in the items array, the
 * expansion can be disabled by setting disabled to true on the item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each row. If using expanding rows, use a template
 * named itemExpandedTemplate to contain expandable content for each row.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-list-view',
  styleUrls: ['./list-view.component.less'],
  templateUrl: './list-view.component.html'
})
export class ListViewComponent implements OnInit {
  /**
   * The name of the template containing actions for each row
   */
  @Input() actionTemplate: TemplateRef<any>;

  /**
   * The list view config containing component properties
   */
  @Input() config: ListViewConfig;

  /**
   * The name of the template used to contain expandable content for each row
   */
  @Input() itemExpandedTemplate: TemplateRef<any>;

  /**
   * An array of items to display in the list view
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
   * The event emitted when a row checkbox has been selected
   */
  @Output('onCheckBoxChange') onCheckBoxChange = new EventEmitter();

  /**
   * The event emitted when a row has been clicked
   */
  @Output('onClick') onClick = new EventEmitter();

  /**
   * The event emitted when a row is double clicked
   */
  @Output('onDblClick') onDblClick = new EventEmitter();

  /**
   * The event emitted when a row is no longer dragged
   */
  // @Output('onDragEnd') onDragEnd = new EventEmitter();

  /**
   * The event emitted when a row is being dragged
   */
  // @Output('onDragMoved') onDragMoved = new EventEmitter();

  /**
   * The event emitted when a row begins to be dragged
   */
  // @Output('onDragStart') onDragStart = new EventEmitter();

  /**
   * The event emitted when a row has been selected
   */
  @Output('onSelect') onSelect = new EventEmitter();

  /**
   * The event emitted when a row selection has been changed
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
    showSelectBox: true
  } as ListViewConfig;
  private dragItem: any;
  private itemsEmpty: boolean = true;
  private prevConfig: ListViewConfig;

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
    if (this.config.selectItems && this.config.showSelectBox) {
      throw new Error('ListViewComponent - Illegal use: ' +
        'Cannot use both select box and click selection at the same time.');
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

  private checkBoxChange(item: any): void {
    this.onCheckBoxChange.emit({
      item: item
    } as ListViewEvent);
  }

  private isSelected(item: any): boolean {
    let matchProp = this.config.selectionMatchProp;
    let selected = false;

    if (this.config.showSelectBox) {
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
    } as ListViewEvent);
    */
  }

  private dragMoved(): void {
    /* Todo: dnd not implemeneted
    this.onDragMoved.emit({
      item: this.dragItem
    } as ListViewEvent);
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
    } as ListViewEvent);
    */
  }

  // Row Selection

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
        } as ListViewEvent);
        this.onSelectionChange.emit({
          item: item,
          selectedItems: this.config.selectedItems
        } as ListViewEvent);
      }
    }
    this.onClick.emit({
      item: item
    } as ListViewEvent);
  }

  private dblClick($event: MouseEvent, item: any): void {
    // Ignore disabled item clicks
    if (this.config.dblClick === true && item.disabled !== true) {
      this.onDblClick.emit({
        item: item
      } as ListViewEvent);
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
