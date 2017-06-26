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
 * List view component.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-list-view',
  styleUrls: ['./list-view.component.less'],
  templateUrl: './list-view.component.html'
})
export class ListViewComponent implements OnInit {
  @Input() actionTemplate: TemplateRef<any>;
  @Input() config: ListViewConfig;
  @Input() itemExpandedTemplate: TemplateRef<any>;
  @Input() items: any[];
  @Input() itemTemplate: TemplateRef<any>;

  @Output('onActionSelect') onActionSelect = new EventEmitter();
  @Output('onCheckBoxChange') onCheckBoxChange = new EventEmitter();
  @Output('onClick') onClick = new EventEmitter();
  @Output('onDblClick') onDblClick = new EventEmitter();
  @Output('onDragEnd') onDragEnd = new EventEmitter();
  @Output('onDragMoved') onDragMoved = new EventEmitter();
  @Output('onDragStart') onDragStart = new EventEmitter();
  @Output('onSelect') onSelect = new EventEmitter();
  @Output('onSelectionChange') onSelectionChange = new EventEmitter();

  dragItem: any;
  itemsEmpty: boolean = true;
  prevConfig: ListViewConfig;

  defaultConfig = {
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

  constructor() {
  }

  // Initialization

  ngOnInit(): void {
    this.setupConfig();
  }

  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
    this.itemsEmpty = !(this.items !== undefined && this.items.length > 0);
  }

  setupConfig(): void {
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

  handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }

  // Checkbox

  checkBoxChange(item: any): void {
    this.onCheckBoxChange.emit({
      item: item
    } as ListViewEvent);
  }

  isSelected(item: any): boolean {
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

  dragEnd(): void {
    this.onDragEnd.emit({
      item: this.dragItem
    } as ListViewEvent);
  }

  dragMoved(): void {
    this.onDragMoved.emit({
      item: this.dragItem
    } as ListViewEvent);
  }

  isDragOriginal(item: any): boolean {
    return (item === this.dragItem);
  }

  dragStart(item: any): void {
    this.dragItem = item;
    this.onDragStart.emit({
      item: this.dragItem
    } as ListViewEvent);
  }

  // Row Selection

  itemClick($event: MouseEvent, item: any): void {
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

  dblClick($event: MouseEvent, item: any): void {
    // Ignore disabled item clicks
    if (this.config.dblClick === true && item.disabled !== true) {
      this.onDblClick.emit({
        item: item
      } as ListViewEvent);
    }
  }

  // Toggle

  closeExpandingRow(item: any): void {
    item.expandingRowId = undefined;
    item.isRowExpanded = false;
  }

  toggleExpandingRow(item: any): void {
    // Row may already be open due to compound expansion
    if (item.isRowExpanded && item.expandingRowId !== undefined) {
      item.expandingRowId = undefined;
      return;
    }
    item.expandingRowId = undefined;
    item.isRowExpanded = !item.isRowExpanded;
  }
}
