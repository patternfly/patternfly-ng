import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { dragula, DragulaService } from 'ng2-dragula';

import { Action } from '../action/action';
import { DataTableConfig } from './datatable-config';
import { DataTableEvent } from './datatable-event';
import { FilterEvent } from '../filter/filter-event';
import { SortEvent } from '../sort/sort-event';
import { ToolbarView } from '../toolbar/toolbar-view';
import { PaginationEvent } from '../pagination/pagination-event';

import { cloneDeep, defaults, isEqual, sortBy } from 'lodash';

/**
 * Data table component.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-datatable',
  styleUrls: ['./datatable.component.less'],
  templateUrl: './datatable.component.html'
})
export class DataTableComponent implements DoCheck, OnInit {
  /**
   * The name of the toolbr template containing actions
   */
  @Input() actionTemplate: TemplateRef<any>;

  /**
   * An array of items to display for table columns
   */
  @Input() columns: any[];

  /**
   * The action config containing component properties
   */
  @Input() config: DataTableConfig;

  /**
   * An array of items to display for table rows
   */
  @Input() rows: any[];

  /**
   * The name of the toolbar template containing views
   */
  @Input() viewTemplate: TemplateRef<any>;

  /**
   * The event emitted when a row has been dragged and dropped
   */
  @Output('onDrop') onDrop = new EventEmitter();

  /**
   * The Event is emitted when Page Size is changed
   */
  @Output('onPageSizeChange') onPageSizeChange = new EventEmitter();

  /**
   * The Event is emitted when Page Number is Changed
   */
  @Output('onPageNumberChange') onPageNumberChange = new EventEmitter();

  /**
   * The event emitted when an action (e.g., button, kebab, etc.) has been selected
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  /**
   * The event emitted when a field menu option is selected
   */
  @Output('onFilterFieldSelect') onFilterFieldSelect = new EventEmitter();

  /**
   * The event emitted when a filter has been changed
   */
  @Output('onFilterChange') onFilterChange = new EventEmitter();

  /**
   * The event emitted when a filter has been saved
   */
  @Output('onFilterSave') onFilterSave = new EventEmitter();

  /**
   * The event emitted when the user types ahead in the query input field
   */
  @Output('onFilterTypeAhead') onFilterTypeAhead = new EventEmitter();

  /**
   * The event emitted when an item selection has been changed
   */
  @Output('onSelectionChange') onSelectionChange = new EventEmitter();

  /**
   * The event emitted when the sort has changed
   */
  @Output('onSortChange') onSortChange = new EventEmitter();

  /**
   * The event emitted when a view has been selected
   */
  @Output('onViewSelect') onViewSelect = new EventEmitter();

  /**
   * Items template
   */
  // @Input() template: TemplateRef<any>;

  /**
   * The event emitted when an action has been selected
   */
  // @Output('onGridReady') onGridReady = new EventEmitter();

  private dragulaName = 'newBag';
  private defaultConfig = {
    dragEnabled: false,
    showCheckbox: false
  } as DataTableConfig;
  private prevConfig: DataTableConfig;
  private prevRows: any[];
  private _selectedRows: any[];
  private renderTable = true;
  private rowsModel: any[];

  /**
   * The default constructor
   */
  constructor(private dragulaService: DragulaService) {
  }

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
    this.rowsModel = [...this.rows];
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
      this.renderTable = false;
      setTimeout(() => {
        this.rowsModel = [...this.rows];
        this.renderTable = true;
      }, 0);
      this.prevRows = cloneDeep(this.rows);
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
    this.selectedRows = this.getSelectedRows(this.rows);
    this.prevConfig = cloneDeep(this.config);
  }

  // Accessors

  get selectedRows(): any[] {
    return this._selectedRows;
  }

  set selectedRows(selectedRows: any[]) {
    this._selectedRows = selectedRows;
  }

  // Actions

  // Selection

  /**
   * Helper to generate selection change event
   *
   * @param row The selected row
   */
  protected checkboxChange(row: any): void {
    this.selectedRows = this.getSelectedRows(this.rows);
    this.onSelectionChange.emit({
      row: row,
      selectedRows: this.selectedRows
    } as DataTableEvent);
  }

  /**
   * Helper to retrieve selected rows
   *
   * @param {any[]} rows The rows containing possible selections
   * @returns {any[]} A list of selected rows
   */
  protected getSelectedRows(rows: any[]): any[] {
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

  // Private

  private handleAction($event: Action) {
    this.onActionSelect.emit($event);
  }

  private handleDrag($event: any[]) {
    // TODO: not implemented
  }

  private handleDrop($event: any[]) {
    // ngx-datatable recommends you force change detection
    this.renderTable = false;
    this.rows = [...$event];

    setTimeout(() => {
      this.onDrop.emit($event);
      this.rowsModel = [...this.rows];
      this.renderTable = true;
    }, 0);
  }

  private handleFilterChange($event: FilterEvent) {
    this.onFilterChange.emit($event);
  }

  private handleFilterFieldSelect($event: FilterEvent) {
    this.onFilterFieldSelect.emit($event);
  }

  private handleFilterTypeAhead($event: FilterEvent) {
    this.onFilterTypeAhead.emit($event);
  }

  private handleFilterSave($event: FilterEvent) {
    this.onFilterSave.emit($event);
  }

  private handlePageSize($event: PaginationEvent) {
    this.onPageSizeChange.emit($event);
  }

  private handlePageNumber($event: PaginationEvent) {
    this.onPageNumberChange.emit($event);
  }

  private handleSortChange($event: SortEvent) {
    this.onSortChange.emit($event);
  }

  private handleViewSelect($event: ToolbarView) {
    this.onViewSelect.emit($event);
  }
}
