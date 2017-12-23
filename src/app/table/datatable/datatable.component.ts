import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import { DatatableComponent } from '@swimlane/ngx-datatable';

import { DataTableConfig } from './datatable-config';
import { TableBase } from '../table-base';
import { TableEvent } from '../table-event';

import { clone, cloneDeep, defaults, isEqual } from 'lodash';

/**
 * Data table component.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-datatable',
  styleUrls: ['./datatable.component.less'],
  templateUrl: './datatable.component.html'
})
export class DataTableComponent extends TableBase implements DoCheck, OnInit {
  /**
   * An array of items to display for table columns
   */
  @Input() columns: any[];

  /**
   * The data table config containing component properties
   */
  @Input() config: DataTableConfig;

  /**
   * The name of the template used with expanding rows
   */
  @Input() expandRowTemplate: TemplateRef<any>;

  /**
   * An array of items to display for table rows
   */
  @Input() rows: any[];

  /**
   * The event emitted when a row has been dragged
   */
  // @Output('onDrag') onDrag = new EventEmitter();

  /**
   * The event emitted when a row has been dropped
   */
  @Output('onDrop') onDrop = new EventEmitter();

  /**
   * The event emitted when an item selection has been changed
   */
  @Output('onSelectionChange') onSelectionChange = new EventEmitter();

  @ViewChild('datatable') private _datatable: DatatableComponent;
  @ViewChild('selectCellTemplate') private selectCellTemplate: TemplateRef<any>;
  @ViewChild('selectHeadTemplate') private selectHeadTemplate: TemplateRef<any>;

  private _cols: any[];
  private _selectedRows: any[];

  private defaultConfig = {
    dragEnabled: false,
    hideClose: false,
    showCheckbox: false,
    useExpandRows: false
  } as DataTableConfig;
  private dragulaName = 'newBag';
  private messages = { emptyMessage: 'No records found' };
  private prevConfig: DataTableConfig;
  private prevRows: any[];
  private rowsModel: any[];
  private showTable = true;

  /**
   * The default constructor
   */
  constructor(private dragulaService: DragulaService) {
    super();
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
    if (!isEqual(this.rows, this.prevRows)) {
      this.rowsModel = [...this.rows];
      this.selectedRows = this.getSelectedRows(this.rows);
      this.prevRows = clone(this.rows); // lodash has issues deep cloning templates
    }
  }

  /**
   * Set up default config
   */
  protected setupConfig(): void {
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }
    this.prevConfig = cloneDeep(this.config);

    let cellClass = '';
    if (this.config.dragEnabled === true
        && (this.config.useExpandRows !== true && this.config.showCheckbox !== true)) {
      cellClass = 'pfng-datatable-dnd-only';
    }

    // ngx-datatable requires width to be visible
    let width = 0;
    if (this.config.showCheckbox === true && this.config.useExpandRows === true && this.config.dragEnabled === true) {
      width = 52;
    } else if (this.config.showCheckbox === true && this.config.useExpandRows === true) {
      width = 50;
    } else if (this.config.showCheckbox === true && this.config.dragEnabled === true) {
      width = 36;
    } else if (this.config.useExpandRows === true && this.config.dragEnabled === true) {
      width = 32;
    } else if (this.config.showCheckbox === true) {
      width = 34;
    } else if (this.config.useExpandRows === true) {
      width = 30;
    } else if (this.config.dragEnabled === true) {
      width = 10;
    }

    this._cols = [];
    if (width > 0) {
      this._cols.push({
        canAutoResize: false,
        cellClass: 'pfng-datatable-select ' + cellClass,
        cellTemplate: this.selectCellTemplate,
        // frozenLeft: true,
        headerClass: 'pfng-datatable-select ' + cellClass,
        headerTemplate: this.selectHeadTemplate,
        name: '_select',
        prop: '_select',
        resizeable: false,
        sortable: false,
        width: width
      });
    }

    this.columns.forEach((col) => {
      if (col.sortable === undefined) {
        col.sortable = false;
      }
      this._cols.push(col);
    });
  }

  // Accessors

  get datatable(): DatatableComponent {
    return this._datatable;
  }

  get cols(): any {
    return this._cols;
  }

  get selectedRows(): any[] {
    return this._selectedRows;
  }

  set selectedRows(selectedRows: any[]) {
    this._selectedRows = selectedRows;
    this.config.toolbarConfig.filterConfig.selectedCount = this._selectedRows.length;
  }

  // Private

  /**
   * Helper to retrieve selected rows
   *
   * @param {any[]} rows The rows containing possible selections
   * @returns {any[]} A list of selected rows
   */
  private getSelectedRows(rows: any[]): any[] {
    let selectedRows = [];
    if (rows !== undefined) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].selected) {
          selectedRows.push(rows[i]);
        }
      }
    }
    return selectedRows;
  }

  private handleDrag($event: any[]) {
    // this.onDrag.emit($event);
  }

  private handleDrop($event: any[]) {
    // ngx-datatable recommends you force change detection
    this.showTable = false;
    this.rows = [...$event];

    setTimeout(() => {
      this.onDrop.emit($event);
      this.rowsModel = [...this.rows];
      this.showTable = true;
    }, 0);
  }

  /**
   * Helper to generate selection change event
   *
   * @param row The selected row
   */
  private selectionChange(row: any): void {
    this.selectedRows = this.getSelectedRows(this.rows);
    this.onSelectionChange.emit({
      row: row,
      selectedRows: this.selectedRows
    } as TableEvent);
  }

  private toggleExpandRow(row: any) {
    if (this.datatable.rowDetail !== undefined) {
      this.datatable.rowDetail.toggleExpandRow(row);
    }
  }
}
