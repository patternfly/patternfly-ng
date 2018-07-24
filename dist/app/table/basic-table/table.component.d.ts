import { AfterViewInit, DoCheck, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgxDataTableConfig } from './ngx-datatable-config';
import { TableConfig } from './table-config';
import { TableBase } from '../table-base';
/**
 * Table component.
 *
 * In order to use drag and drop, please include the following CSS file from ng2-dragula. For example:
 * <code>import 'dragula/dist/dragula.css';</code>
 *
 * For ngx-datatable options, see: https://swimlane.gitbooks.io/ngx-datatable/
 *
 * Note: The underlying ngx-datatable uses ContentChildren to retrieve DataTableColumnDirective (ngx-datatable-column)
 * tags. As a result of wrapping ngx-datatable, these objects are no longer direct descendents and ContentChildren
 * cannot retrieve them. A fix to ContentChildren may be in the works...
 *
 * Instead of using ngx-datatable-column, table cells may be defined using templates, provided as the
 * columns cellTemplate property. For example:
 *
 * <code>
 * this.columns = [{
 *   cellTemplate: this.nameTemplate,
 *   prop: 'name',
 *   name: 'Name'
 * }]
 * </code>
 *
 * and
 *
 * <code>
 * &lt;ng-template #nameTemplate let-row="row"&gt;
 *   &lt;span>{{row.name}}&lt;/span&gt;
 * &lt;/ng-template&gt;
 * </code>
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { TableModule } from 'patternfly-ng/table';
 * // Or
 * import { TableModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 * // NGX Datatable
 * import { NgxDatatableModule } from '@swimlane/ngx-datatable';
 *
 * &#64;NgModule({
 *   imports: [BsDropdownModule.forRoot(), NgxDatatableModule, TableModule,...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { NgxDataTableConfig, TableConfig, TableEvent } from 'patternfly-ng/table';
 * </pre></code>
 */
export declare class TableComponent extends TableBase implements AfterViewInit, DoCheck, OnInit {
    private dragulaService;
    /**
     * An array of items to display for table columns
     */
    columns: any[];
    /**
     * The table config containing component properties
     */
    config: TableConfig;
    /**
     * The ngx-datatable config containing component properties
     */
    dataTableConfig: NgxDataTableConfig;
    /**
     * The name of the template used with expanding rows
     */
    expandRowTemplate: TemplateRef<any>;
    /**
     * The name of the template used with group headers
     */
    groupHeaderTemplate: TemplateRef<any>;
    /**
     * The ngx-datatable event emitted when a cell or row was focused via keyboard or mouse click
     */
    rows: any[];
    /**
     * The ngx-datatable event emitted when a cell or row was focused via keyboard or mouse click
     */
    onActivate: EventEmitter<{}>;
    /**
     * The ngx-datatable event emitted when a row detail row was toggled
     *
     * Not applicable with pfng-table useExpandRows
     */
    onDetailToggle: EventEmitter<{}>;
    /**
     * The ngx-datatable event emitted when a row detail row was toggled
     *
     * Not applicable with pfng-table paginationConfig
     */
    onPage: EventEmitter<{}>;
    /**
     * The ngx-datatable event emitted when columns are re-ordered
     */
    onReorder: EventEmitter<{}>;
    /**
     * The ngx-datatable event emitted when a column is resized
     */
    onResize: EventEmitter<{}>;
    /**
     * The ngx-datatable event emitted when a cell or row was selected
     *
     * Not applicable with pfng-table showCheckbox
     */
    onSelect: EventEmitter<{}>;
    /**
     * The ngx-datatable event emitted when body was scrolled (e.g., when scrollbarV is true)
     */
    onScroll: EventEmitter<{}>;
    /**
     * The ngx-datatable event emitted when a column header is sorted
     */
    onSort: EventEmitter<{}>;
    /**
     * The ngx-datatable event emitted when a context menu is invoked on the table
     */
    onTableContextMenu: EventEmitter<{}>;
    /**
     * The event emitted when a row has been dragged
     */
    /**
     * The event emitted when a row has been dropped
     */
    onDrop: EventEmitter<{}>;
    private _datatable;
    private selectCellTemplate;
    private selectHeadTemplate;
    private _allRowsSelected;
    private _cols;
    private _selectedRows;
    private _showTable;
    private defaultConfig;
    private defaultDataTableConfig;
    private dragulaName;
    private prevConfig;
    private prevDataTableConfig;
    private prevRows;
    private rowsModel;
    /**
     * The default constructor
     */
    constructor(dragulaService: DragulaService);
    /**
     * Setup component configuration upon view initialization
     */
    ngAfterViewInit(): void;
    /**
     *  Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     *  Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Set up default config
     */
    protected setupConfig(): void;
    /**
     * Set up default ngx-datatable config
     */
    protected setupDataTableConfig(): void;
    /**
     * Set up selection columns
     */
    protected setupSelectionCols(): void;
    /**
     * Returns a flag indicating whether all visible rows are selected
     *
     * @returns {boolean} True if all visible rows are selected
     */
    /**
    * Sets a flag indicating whether all visible rows are selected
    *
    * @param {boolean} selected True if all visible rows are selected
    */
    allRowsSelected: boolean;
    /**
     * Returns the columns used by the ngx-datatable component
     *
     * @returns {any[]} The ngx-datatable columns
     */
    protected readonly cols: any[];
    /**
     * Returns the underlying ngx-datatable component
     *
     * @returns {DatatableComponent}
     */
    readonly datatable: DatatableComponent;
    /**
     * Get the flag indicating table has data, including filtered rows
     *
     * @returns {boolean} True is the table has data
     */
    readonly hasData: boolean;
    /**
     * Returns the currently selected rows
     *
     * @returns {any[]} The selected rows
     */
    /**
    * Sets the currently selected rows
    *
    * @param {any[]} selectedRows The selected rows
    */
    selectedRows: any[];
    /**
     * Returns flag indicating table is visible
     *
     * @returns {boolean} True if table is visible
     */
    /**
    * Set the flag indicating table is visible
    *
    * @param {boolean} visible True if table is visible
    */
    protected showTable: boolean;
    /**
     * Helper to generate ngx-datatable activate event
     */
    private handleActivate;
    /**
     * Helper to generate ngx-datatable detailToggle event
     */
    private handleDetailToggle;
    private handleDragulaDrag;
    /**
     * Helper to generate dragula drop event
     *
     * @param {any[]} $event
     */
    private handleDragulaDrop;
    /**
     * Helper to generate ngx-datatable page event
     */
    private handlePage;
    /**
     * Helper to generate ngx-datatable reorder event
     */
    private handleReorder;
    /**
     * Helper to generate ngx-datatable resize event
     */
    private handleResize;
    /**
     * Helper to generate ngx-datatable scroll event
     */
    private handleScroll;
    /**
     * Helper to generate ngx-datatable select event
     */
    private handleSelect;
    /**
     * Helper to generate ngx-datatable sort event
     */
    private handleSort;
    /**
     * Helper to generate ngx-datatable tableContextmenu event
     */
    private handleTableContextMenu;
    /**
     * Helper to test if pagination config has changed
     *
     * @returns {boolean} True if pagination config has changed
     */
    private hasPaginationChanged;
    /**
     * Helper to test if toolbar config has changed
     *
     * @returns {boolean} True if toolbar config has changed
     */
    private hasToolbarChanged;
    /**
     * Helper to initialize de/select all control
     */
    private initAllRowsSelected;
    /**
     * Helper to initialize selected rows
     */
    private initSelectedRows;
    /**
     * Helper to generate selection change event
     *
     * @param row The selected row
     */
    private selectionChange;
    /**
     * Helper to generate selection change event when all rows are selected
     */
    private selectionsChange;
    /**
     * Helper to expand group
     *
     * @param group The group to expand
     */
    private toggleExpandGroup;
    /**
     * Helper to expand row
     *
     * @param row The row to expand
     */
    private toggleExpandRow;
}
