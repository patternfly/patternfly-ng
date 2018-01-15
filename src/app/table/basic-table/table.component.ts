import {
  AfterViewInit,
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

import { TableConfig } from './table-config';
import { NgxDataTableConfig } from './ngx-datatable-config';
import { TableBase } from '../table-base';
import { TableEvent } from '../table-event';

import { clone, cloneDeep, defaults, isEqual } from 'lodash';

/**
 * Table component.
 *
 * Table cells are defined using cell templates provided as column options.
 * For example:
 * <code>
 * this.columns = [{
 *   cellTemplate: this.nameTemplate,
 *   prop: 'name',
 *   name: 'Name'
 * }]
 * </code>
 *
 * Note: In order to use drag and drop, please include the following CSS file from ng2-dragula. For example:
 * <code>import 'dragula/dist/dragula.css';</code>
 *
 * For ngx-datatable options, see: https://swimlane.gitbooks.io/ngx-datatable/
 *
 * Todo: row grouping and footer are not currently implemented
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-table',
  styleUrls: ['./table.component.less'],
  templateUrl: './table.component.html'
})
export class TableComponent extends TableBase implements AfterViewInit, DoCheck, OnInit {
  /**
   * An array of items to display for table columns
   */
  @Input() columns: any[];

  /**
   * The table config containing component properties
   */
  @Input() config: TableConfig;

  /**
   * The ngx-datatable config containing component properties
   */
  @Input() dataTableConfig: NgxDataTableConfig;

  /**
   * The name of the template used with expanding rows
   */
  @Input() expandRowTemplate: TemplateRef<any>;

  /**
   * The name of the template used with group headers
   */
  @Input() groupHeaderTemplate: TemplateRef<any>;

  /**
   * The ngx-datatable event emitted when a cell or row was focused via keyboard or mouse click
   */
  @Input() rows: any[];

  /**
   * The ngx-datatable event emitted when a cell or row was focused via keyboard or mouse click
   */
  @Output('onActivate') onActivate = new EventEmitter();

  /**
   * The ngx-datatable event emitted when columns are re-ordered
   */
  @Output('onReorder') onReorder = new EventEmitter();

  /**
   * The ngx-datatable event emitted when a column is resized
   */
  @Output('onResize') onResize = new EventEmitter();

  /**
   * The ngx-datatable event emitted when body was scrolled (e.g., when scrollbarV is true)
   */
  @Output('onScroll') onScroll = new EventEmitter();

  /**
   * The ngx-datatable event emitted when a context menu is invoked on the table
   */
  // @Output('onTableContextMenu') onTableContextMenu = new EventEmitter();

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

  private _allRowsSelected: boolean = false;
  private _cols: any[];
  private _selectedRows: any[];
  private _showTable: boolean = true;

  private defaultConfig = {
    dragEnabled: false,
    hideClose: false,
    showCheckbox: false,
    styleClass: 'patternfly',
    useExpandRows: false
  } as TableConfig;

  private defaultDataTableConfig = {
    columnMode: 'force',
    cssClasses: {
      sortAscending: 'datatable-icon-up',
      sortDescending: 'datatable-icon-down',
      pagerLeftArrow: 'datatable-icon-left',
      pagerRightArrow: 'datatable-icon-right',
      pagerPrevious: 'datatable-icon-prev',
      pagerNext: 'datatable-icon-skip'
    },
    externalPaging: false,
    externalSorting: true,
    headerHeight: 50,
    messages: { emptyMessage: 'No records found' },
    offset: 0,
    reorderable: true,
    rowHeight: 'auto',
    rowIdentity: ((x: any) => x),
    scrollbarH: false,
    scrollbarV: false
  } as NgxDataTableConfig;

  private dragulaName = 'newBag';
  private prevConfig: TableConfig;
  private prevDataTableConfig: NgxDataTableConfig;
  private prevRows: any[];
  private rowsModel: any[];

  /**
   * The default constructor
   */
  constructor(private dragulaService: DragulaService) {
    super();
  }

  // Initialization

  /**
   * Setup component configuration upon view initialization
   */
  ngAfterViewInit(): void {
    // Reinitialize to include selection column cell/header templates
    this.setupSelectionCols();
  }

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
    this.setupSelectionCols(); // Initialize here for selection column width
    this.setupDataTableConfig();
  }

  /**
   *  Check if the component config has changed
   */
  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      // Skip pagination and toolbar changes
      if (!(this.hasPaginationChanged() || this.hasToolbarChanged())) {
        this.setupSelectionCols();
      }
      this.setupConfig();
    }
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
    if (!isEqual(this.dataTableConfig, this.prevDataTableConfig)) {
      this.setupDataTableConfig();
    }
    if (!isEqual(this.rows, this.prevRows)) {
      this.rowsModel = [...this.rows];
      this.initSelectedRows();
      this.initAllRowsSelected();
      this.prevRows = clone(this.rows); // lodash has issues deep cloning templates
      if (this.config.toolbarConfig !== undefined) {
        this.config.toolbarConfig.disabled = !this.hasData; // disable toolbar actions
      }
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
  }

  /**
   * Set up default ngx-datatable config
   */
  protected setupDataTableConfig(): void {
    if (this.dataTableConfig !== undefined) {
      defaults(this.dataTableConfig, this.defaultDataTableConfig);
    } else {
      this.dataTableConfig = cloneDeep(this.defaultDataTableConfig);
    }
    this.prevDataTableConfig = cloneDeep(this.dataTableConfig);
  }

  /**
   * Set up selection columns
   */
  protected setupSelectionCols(): void {
    let cellClass = '';
    if (this.config.dragEnabled === true
        && (this.config.useExpandRows !== true && this.config.showCheckbox !== true)) {
      cellClass = 'pfng-table-dnd-only';
    }

    // ngx-datatable requires width property to become visible
    let width = 0;
    if (this.config.showCheckbox === true && this.config.useExpandRows === true && this.config.dragEnabled === true) {
      width = 57;
    } else if (this.config.showCheckbox === true && this.config.useExpandRows === true) {
      width = 52;
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
        cellClass: 'pfng-table-select ' + cellClass,
        cellTemplate: this.selectCellTemplate,
        headerClass: 'pfng-table-select ' + cellClass,
        headerTemplate: this.selectHeadTemplate,
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

  /**
   * Returns a flag indicating whether all visible rows are selected
   *
   * @returns {boolean} True if all visible rows are selected
   */
  get allRowsSelected(): boolean {
    return (this.rows !== undefined && this.rows.length > 0) ? this._allRowsSelected : false;
  }

  /**
   * Sets a flag indicating whether all visible rows are selected
   *
   * @param {boolean} selected True if all visible rows are selected
   */
  set allRowsSelected(selected: boolean) {
    this._allRowsSelected = selected;
    if (this.rows !== undefined) {
      for (let i = 0; i < this.rows.length; i++) {
        this.rows[i].selected = (selected === true) ? true : false;
      }
    }
  }

  /**
   * Returns the columns used by the ngx-datatable component
   *
   * @returns {any[]} The ngx-datatable columns
   */
  protected get cols(): any[] {
    return this._cols;
  }

  /**
   * Returns the underlying ngx-datatable component
   *
   * @returns {DatatableComponent}
   */
  get datatable(): DatatableComponent {
    return this._datatable;
  }

  /**
   * Get the flag indicating table has data, including filtered rows
   *
   * @returns {boolean} True is the table has data
   */
  get hasData(): boolean {
    let hasRows = (this.rows !== undefined && this.rows.length > 0);
    let hasFilter = false;

    if (this.config.appliedFilters !== undefined) {
      hasFilter = (this.config.appliedFilters.length > 0);
    } else if (this.config.toolbarConfig !== undefined
        && this.config.toolbarConfig.filterConfig !== undefined
        && this.config.toolbarConfig.filterConfig.appliedFilters !== undefined) {
      hasFilter = (this.config.toolbarConfig.filterConfig.appliedFilters.length > 0);
    }
    return hasRows || hasFilter;
  }

  /**
   * Returns the currently selected rows
   *
   * @returns {any[]} The selected rows
   */
  get selectedRows(): any[] {
    return (this.dataTableConfig.selected !== undefined && this.config.showCheckbox !== true)
      ? this.dataTableConfig.selected : this._selectedRows;
  }

  /**
   * Sets the currently selected rows
   *
   * @param {any[]} selectedRows The selected rows
   */
  set selectedRows(selectedRows: any[]) {
    if (selectedRows !== undefined) {
      this._selectedRows = selectedRows;
      if (this.config.toolbarConfig !== undefined && this.config.toolbarConfig.filterConfig !== undefined) {
        this.config.toolbarConfig.filterConfig.selectedCount = this._selectedRows.length;
      }
    }
  }

  /**
   * Returns flag indicating table is visible
   *
   * @returns {boolean} True if table is visible
   */
  protected get showTable(): boolean {
    return this._showTable;
  }

  /**
   * Set the flag indicating table is visible
   *
   * @param {boolean} visible True if table is visible
   */
  protected set showTable(visible: boolean) {
    this._showTable = visible;
  }

  // Private

  /**
   * Helper to generate ngx-datatable activate event
   */
  private handleActivate($event: any): void {
    this.onActivate.emit($event);
  }

  // Todo: Not implemented yet
  private handleDragulaDrag($event: any[]): void {
    // this.onDrag.emit($event);
  }

  /**
   * Helper to generate dragula drop event
   *
   * @param {any[]} $event
   */
  private handleDragulaDrop($event: any[]): void {
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
   * Helper to generate ngx-datatable reorder event
   */
  private handleReorder($event: any): void {
    this.onReorder.emit($event);

    // Save new order for drag and drop changes
    let newCols = this.cols.slice();
    newCols.splice($event.prevValue, 1);
    newCols.splice($event.newValue, 0, $event.column);
    this._cols = newCols;
  }

  /**
   * Helper to generate ngx-datatable resize event
   */
  private handleResize($event: any): void {
    this.onResize.emit($event);
  }

  /**
   * Helper to generate ngx-datatable scroll event
   */
  private handleScroll($event: any): void {
    this.onScroll.emit($event);
  }

  /**
   * Helper to generate ngx-datatable tableContextmenu event
   */
  private handleTableContextMenu($event: any): void {
    // Todo: Not implemented yet
    // this.onTableContextMenu.emit($event);
  }

  /**
   * Helper to test if pagination config has changed
   *
   * @returns {boolean} True if pagination config has changed
   */
  private hasPaginationChanged(): boolean {
    let change = (this.config.paginationConfig !== undefined && this.prevConfig.paginationConfig !== undefined
      && !isEqual(this.config.paginationConfig, this.prevConfig.paginationConfig));
    return change;
  }

  /**
   * Helper to test if toolbar config has changed
   *
   * @returns {boolean} True if toolbar config has changed
   */
  private hasToolbarChanged(): boolean {
    let change = (this.config.toolbarConfig !== undefined && this.prevConfig.toolbarConfig !== undefined
      && !isEqual(this.config.toolbarConfig, this.prevConfig.toolbarConfig));
    return change;
  }

  /**
   * Helper to initialize de/select all control
   */
  private initAllRowsSelected(): void {
    this._allRowsSelected = (this.selectedRows !== undefined && this.selectedRows.length === this.rows.length);
  }

  /**
   * Helper to initialize selected rows
   */
  private initSelectedRows(): void {
    let selected = [];
    if (this.rows !== undefined) {
      for (let i = 0; i < this.rows.length; i++) {
        if (this.rows[i].selected) {
          selected.push(this.rows[i]);
        }
      }
    }
    this.selectedRows = selected;
  }

  /**
   * Helper to generate selection change event
   *
   * @param row The selected row
   */
  private selectionChange(row: any): void {
    this.initSelectedRows();
    this.initAllRowsSelected();
    this.onSelectionChange.emit({
      row: row,
      selectedRows: this.selectedRows
    } as TableEvent);
  }

  /**
   * Helper to generate selection change event when all rows are selected
   */
  private selectionsChange(): void {
    this.selectedRows = (this.allRowsSelected === true) ? this.rows : [];
    this.onSelectionChange.emit({
      selectedRows: this.selectedRows
    } as TableEvent);
  }

  /**
   * Helper to expand group
   *
   * @param group The group to expand
   */
  private toggleExpandGroup(group: any): void {
    this.datatable.groupHeader.toggleExpandGroup(group);
  }

  /**
   * Helper to expand row
   *
   * @param row The row to expand
   */
  private toggleExpandRow(row: any): void {
    if (this.datatable.rowDetail !== undefined) {
      this.datatable.rowDetail.toggleExpandRow(row);
    }
  }
}
