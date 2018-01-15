var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { TableConfig } from './table-config';
import { NgxDataTableConfig } from './ngx-datatable-config';
import { TableBase } from '../table-base';
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
var TableComponent = /** @class */ (function (_super) {
    __extends(TableComponent, _super);
    /**
     * The default constructor
     */
    function TableComponent(dragulaService) {
        var _this = _super.call(this) || this;
        _this.dragulaService = dragulaService;
        /**
         * The ngx-datatable event emitted when a cell or row was focused via keyboard or mouse click
         */
        _this.onActivate = new EventEmitter();
        /**
         * The ngx-datatable event emitted when columns are re-ordered
         */
        _this.onReorder = new EventEmitter();
        /**
         * The ngx-datatable event emitted when a column is resized
         */
        _this.onResize = new EventEmitter();
        /**
         * The ngx-datatable event emitted when body was scrolled (e.g., when scrollbarV is true)
         */
        _this.onScroll = new EventEmitter();
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
        _this.onDrop = new EventEmitter();
        /**
         * The event emitted when an item selection has been changed
         */
        _this.onSelectionChange = new EventEmitter();
        _this._allRowsSelected = false;
        _this._showTable = true;
        _this.defaultConfig = {
            dragEnabled: false,
            hideClose: false,
            showCheckbox: false,
            styleClass: 'patternfly',
            useExpandRows: false
        };
        _this.defaultDataTableConfig = {
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
            rowIdentity: (function (x) { return x; }),
            scrollbarH: false,
            scrollbarV: false
        };
        _this.dragulaName = 'newBag';
        return _this;
    }
    // Initialization
    /**
     * Setup component configuration upon view initialization
     */
    TableComponent.prototype.ngAfterViewInit = function () {
        // Reinitialize to include selection column cell/header templates
        this.setupSelectionCols();
    };
    /**
     *  Setup component configuration upon initialization
     */
    TableComponent.prototype.ngOnInit = function () {
        this.setupConfig();
        this.setupSelectionCols(); // Initialize here for selection column width
        this.setupDataTableConfig();
    };
    /**
     *  Check if the component config has changed
     */
    TableComponent.prototype.ngDoCheck = function () {
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
            this.rowsModel = this.rows.slice();
            this.initSelectedRows();
            this.initAllRowsSelected();
            this.prevRows = clone(this.rows); // lodash has issues deep cloning templates
            if (this.config.toolbarConfig !== undefined) {
                this.config.toolbarConfig.disabled = !this.hasData; // disable toolbar actions
            }
        }
    };
    /**
     * Set up default config
     */
    TableComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    /**
     * Set up default ngx-datatable config
     */
    TableComponent.prototype.setupDataTableConfig = function () {
        if (this.dataTableConfig !== undefined) {
            defaults(this.dataTableConfig, this.defaultDataTableConfig);
        }
        else {
            this.dataTableConfig = cloneDeep(this.defaultDataTableConfig);
        }
        this.prevDataTableConfig = cloneDeep(this.dataTableConfig);
    };
    /**
     * Set up selection columns
     */
    TableComponent.prototype.setupSelectionCols = function () {
        var _this = this;
        var cellClass = '';
        if (this.config.dragEnabled === true
            && (this.config.useExpandRows !== true && this.config.showCheckbox !== true)) {
            cellClass = 'pfng-table-dnd-only';
        }
        // ngx-datatable requires width property to become visible
        var width = 0;
        if (this.config.showCheckbox === true && this.config.useExpandRows === true && this.config.dragEnabled === true) {
            width = 57;
        }
        else if (this.config.showCheckbox === true && this.config.useExpandRows === true) {
            width = 52;
        }
        else if (this.config.showCheckbox === true && this.config.dragEnabled === true) {
            width = 36;
        }
        else if (this.config.useExpandRows === true && this.config.dragEnabled === true) {
            width = 32;
        }
        else if (this.config.showCheckbox === true) {
            width = 34;
        }
        else if (this.config.useExpandRows === true) {
            width = 30;
        }
        else if (this.config.dragEnabled === true) {
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
        this.columns.forEach(function (col) {
            if (col.sortable === undefined) {
                col.sortable = false;
            }
            _this._cols.push(col);
        });
    };
    Object.defineProperty(TableComponent.prototype, "allRowsSelected", {
        // Accessors
        /**
         * Returns a flag indicating whether all visible rows are selected
         *
         * @returns {boolean} True if all visible rows are selected
         */
        get: function () {
            return (this.rows !== undefined && this.rows.length > 0) ? this._allRowsSelected : false;
        },
        /**
         * Sets a flag indicating whether all visible rows are selected
         *
         * @param {boolean} selected True if all visible rows are selected
         */
        set: function (selected) {
            this._allRowsSelected = selected;
            if (this.rows !== undefined) {
                for (var i = 0; i < this.rows.length; i++) {
                    this.rows[i].selected = (selected === true) ? true : false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "cols", {
        /**
         * Returns the columns used by the ngx-datatable component
         *
         * @returns {any[]} The ngx-datatable columns
         */
        get: function () {
            return this._cols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "datatable", {
        /**
         * Returns the underlying ngx-datatable component
         *
         * @returns {DatatableComponent}
         */
        get: function () {
            return this._datatable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "hasData", {
        /**
         * Get the flag indicating table has data, including filtered rows
         *
         * @returns {boolean} True is the table has data
         */
        get: function () {
            var hasRows = (this.rows !== undefined && this.rows.length > 0);
            var hasFilter = false;
            if (this.config.appliedFilters !== undefined) {
                hasFilter = (this.config.appliedFilters.length > 0);
            }
            else if (this.config.toolbarConfig !== undefined
                && this.config.toolbarConfig.filterConfig !== undefined
                && this.config.toolbarConfig.filterConfig.appliedFilters !== undefined) {
                hasFilter = (this.config.toolbarConfig.filterConfig.appliedFilters.length > 0);
            }
            return hasRows || hasFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "selectedRows", {
        /**
         * Returns the currently selected rows
         *
         * @returns {any[]} The selected rows
         */
        get: function () {
            return (this.dataTableConfig.selected !== undefined && this.config.showCheckbox !== true)
                ? this.dataTableConfig.selected : this._selectedRows;
        },
        /**
         * Sets the currently selected rows
         *
         * @param {any[]} selectedRows The selected rows
         */
        set: function (selectedRows) {
            if (selectedRows !== undefined) {
                this._selectedRows = selectedRows;
                if (this.config.toolbarConfig !== undefined && this.config.toolbarConfig.filterConfig !== undefined) {
                    this.config.toolbarConfig.filterConfig.selectedCount = this._selectedRows.length;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "showTable", {
        /**
         * Returns flag indicating table is visible
         *
         * @returns {boolean} True if table is visible
         */
        get: function () {
            return this._showTable;
        },
        /**
         * Set the flag indicating table is visible
         *
         * @param {boolean} visible True if table is visible
         */
        set: function (visible) {
            this._showTable = visible;
        },
        enumerable: true,
        configurable: true
    });
    // Private
    /**
     * Helper to generate ngx-datatable activate event
     */
    TableComponent.prototype.handleActivate = function ($event) {
        this.onActivate.emit($event);
    };
    // Todo: Not implemented yet
    TableComponent.prototype.handleDragulaDrag = function ($event) {
        // this.onDrag.emit($event);
    };
    /**
     * Helper to generate dragula drop event
     *
     * @param {any[]} $event
     */
    TableComponent.prototype.handleDragulaDrop = function ($event) {
        var _this = this;
        // ngx-datatable recommends you force change detection
        this.showTable = false;
        this.rows = $event.slice();
        setTimeout(function () {
            _this.onDrop.emit($event);
            _this.rowsModel = _this.rows.slice();
            _this.showTable = true;
        }, 0);
    };
    /**
     * Helper to generate ngx-datatable reorder event
     */
    TableComponent.prototype.handleReorder = function ($event) {
        this.onReorder.emit($event);
        // Save new order for drag and drop changes
        var newCols = this.cols.slice();
        newCols.splice($event.prevValue, 1);
        newCols.splice($event.newValue, 0, $event.column);
        this._cols = newCols;
    };
    /**
     * Helper to generate ngx-datatable resize event
     */
    TableComponent.prototype.handleResize = function ($event) {
        this.onResize.emit($event);
    };
    /**
     * Helper to generate ngx-datatable scroll event
     */
    TableComponent.prototype.handleScroll = function ($event) {
        this.onScroll.emit($event);
    };
    /**
     * Helper to generate ngx-datatable tableContextmenu event
     */
    TableComponent.prototype.handleTableContextMenu = function ($event) {
        // Todo: Not implemented yet
        // this.onTableContextMenu.emit($event);
    };
    /**
     * Helper to test if pagination config has changed
     *
     * @returns {boolean} True if pagination config has changed
     */
    TableComponent.prototype.hasPaginationChanged = function () {
        var change = (this.config.paginationConfig !== undefined && this.prevConfig.paginationConfig !== undefined
            && !isEqual(this.config.paginationConfig, this.prevConfig.paginationConfig));
        return change;
    };
    /**
     * Helper to test if toolbar config has changed
     *
     * @returns {boolean} True if toolbar config has changed
     */
    TableComponent.prototype.hasToolbarChanged = function () {
        var change = (this.config.toolbarConfig !== undefined && this.prevConfig.toolbarConfig !== undefined
            && !isEqual(this.config.toolbarConfig, this.prevConfig.toolbarConfig));
        return change;
    };
    /**
     * Helper to initialize de/select all control
     */
    TableComponent.prototype.initAllRowsSelected = function () {
        this._allRowsSelected = (this.selectedRows !== undefined && this.selectedRows.length === this.rows.length);
    };
    /**
     * Helper to initialize selected rows
     */
    TableComponent.prototype.initSelectedRows = function () {
        var selected = [];
        if (this.rows !== undefined) {
            for (var i = 0; i < this.rows.length; i++) {
                if (this.rows[i].selected) {
                    selected.push(this.rows[i]);
                }
            }
        }
        this.selectedRows = selected;
    };
    /**
     * Helper to generate selection change event
     *
     * @param row The selected row
     */
    TableComponent.prototype.selectionChange = function (row) {
        this.initSelectedRows();
        this.initAllRowsSelected();
        this.onSelectionChange.emit({
            row: row,
            selectedRows: this.selectedRows
        });
    };
    /**
     * Helper to generate selection change event when all rows are selected
     */
    TableComponent.prototype.selectionsChange = function () {
        this.selectedRows = (this.allRowsSelected === true) ? this.rows : [];
        this.onSelectionChange.emit({
            selectedRows: this.selectedRows
        });
    };
    /**
     * Helper to expand group
     *
     * @param group The group to expand
     */
    TableComponent.prototype.toggleExpandGroup = function (group) {
        this.datatable.groupHeader.toggleExpandGroup(group);
    };
    /**
     * Helper to expand row
     *
     * @param row The row to expand
     */
    TableComponent.prototype.toggleExpandRow = function (row) {
        if (this.datatable.rowDetail !== undefined) {
            this.datatable.rowDetail.toggleExpandRow(row);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TableComponent.prototype, "columns", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TableConfig)
    ], TableComponent.prototype, "config", void 0);
    __decorate([
        Input(),
        __metadata("design:type", NgxDataTableConfig)
    ], TableComponent.prototype, "dataTableConfig", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], TableComponent.prototype, "expandRowTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], TableComponent.prototype, "groupHeaderTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TableComponent.prototype, "rows", void 0);
    __decorate([
        Output('onActivate'),
        __metadata("design:type", Object)
    ], TableComponent.prototype, "onActivate", void 0);
    __decorate([
        Output('onReorder'),
        __metadata("design:type", Object)
    ], TableComponent.prototype, "onReorder", void 0);
    __decorate([
        Output('onResize'),
        __metadata("design:type", Object)
    ], TableComponent.prototype, "onResize", void 0);
    __decorate([
        Output('onScroll'),
        __metadata("design:type", Object)
    ], TableComponent.prototype, "onScroll", void 0);
    __decorate([
        Output('onDrop'),
        __metadata("design:type", Object)
    ], TableComponent.prototype, "onDrop", void 0);
    __decorate([
        Output('onSelectionChange'),
        __metadata("design:type", Object)
    ], TableComponent.prototype, "onSelectionChange", void 0);
    __decorate([
        ViewChild('datatable'),
        __metadata("design:type", DatatableComponent)
    ], TableComponent.prototype, "_datatable", void 0);
    __decorate([
        ViewChild('selectCellTemplate'),
        __metadata("design:type", TemplateRef)
    ], TableComponent.prototype, "selectCellTemplate", void 0);
    __decorate([
        ViewChild('selectHeadTemplate'),
        __metadata("design:type", TemplateRef)
    ], TableComponent.prototype, "selectHeadTemplate", void 0);
    TableComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-table',
            styles: [".pfng-table .blank-slate-pf{border-bottom:1px solid #d1d1d1;border-left:1px solid #d1d1d1;border-right:1px solid #d1d1d1;border-top:1px solid #d1d1d1}.pfng-table .content-view-pf-pagination{border-top:none}.pfng-table .row.toolbar-pf{border:1px solid #d1d1d1}.pfng-table-dnd-container{-ms-flex-item-align:stretch;align-self:stretch;display:-webkit-box;display:-ms-flexbox;display:flex}.pfng-table-dnd-header:before{background-image:linear-gradient(to bottom,#0088ce 60%,#fff 0);background-position:left;background-repeat:repeat-y;background-size:2px 5px;border:4px solid #00659c;content:'';height:100%;left:0;position:absolute;top:0;width:10px}.ngx-datatable.patternfly .datatable-body-cell,.pfng-table .row.toolbar-pf,.pfng-table-expand-container{border-right:1px solid #d1d1d1}.ngx-datatable.patternfly .datatable-body-cell:first-child,.ngx-datatable.patternfly .datatable-header-cell:first-child,.pfng-table .row.toolbar-pf,.pfng-table-expand-container{border-left:1px solid #d1d1d1}.pfng-table-dnd-header:hover{cursor:move}.ngx-datatable.patternfly .datatable-body-cell-label .fa:hover,.ngx-datatable.patternfly .datatable-header .datatable-header-cell-wrapper{cursor:pointer}.pfng-table-expand-container{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;border-bottom:1px solid #d1d1d1;display:-webkit-box;display:-ms-flexbox;display:flex;padding:20px}.pfng-table-expand-content{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.pfng-table-select .ng-untouched{margin-top:0}.pfng-table .row.toolbar-pf{background-color:#f5f5f5;border-bottom:none;border-top:1px solid #d1d1d1;box-shadow:none;margin-left:0;margin-right:0}.pfng-table .table-view-pf-select-results{padding-bottom:10px}.ngx-datatable .gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.5}.ngx-datatable .gu-hide{display:none!important}.ngx-datatable .gu-unselectable{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.ngx-datatable .gu-transit{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;color:#fff;background-color:#0088ce;opacity:.5}.ngx-datatable.patternfly{margin-bottom:-5px;border-top:1px solid #d1d1d1;box-shadow:none}.ngx-datatable.patternfly .datatable-header{background-image:linear-gradient(to bottom,#fafafa 0,#ededed 100%);background-repeat:repeat-x;background-color:#f5f5f5;height:unset!important}.ngx-datatable.patternfly .datatable-header-cell{border-right:1px solid #d1d1d1;border-bottom:1px solid #d1d1d1;font-weight:600;padding:2px 10px 3px;vertical-align:bottom}.ngx-datatable.patternfly .datatable-header-cell.pfng-table-select{padding-top:6px;text-align:center}.ngx-datatable.patternfly .datatable-header-cell.pfng-table-dnd-only{padding-left:0;padding-right:0}.ngx-datatable.patternfly .datatable-header-cell.sortable.sort-active{color:#0088ce}.ngx-datatable.patternfly .datatable-header-cell.sortable.sort-active.sort-asc,.ngx-datatable.patternfly .datatable-header-cell.sortable.sort-active.sort-desc{color:#0088ce!important;position:relative;background-image:none!important;padding-top:2px}.ngx-datatable.patternfly .datatable-header-cell.sortable.sort-active.sort-asc:before,.ngx-datatable.patternfly .datatable-header-cell.sortable.sort-active.sort-desc:before{background:#0088ce;content:'';height:2px;position:absolute;left:0;top:0;width:100%}.ngx-datatable.patternfly .datatable-header-cell.sortable.sort-active.sort-asc .datatable-header-cell-label:after,.ngx-datatable.patternfly .datatable-header-cell.sortable.sort-active.sort-desc .datatable-header-cell-label:after{color:#0088ce;font-family:FontAwesome;font-size:10px;font-weight:400;height:9px;margin-left:5px;line-height:1.2;position:absolute;top:7px;vertical-align:baseline;width:12px}.ngx-datatable.patternfly .datatable-header-cell.sortable.sort-active.sort-desc .datatable-header-cell-label:after{content:'\f107'}.ngx-datatable.patternfly .datatable-header-cell.sortable.sort-active.sort-asc .datatable-header-cell-label:after{content:'\f106'}.ngx-datatable.patternfly .datatable-header .datatable-header-cell-label{line-height:24px}.ngx-datatable.patternfly .datatable-body-row{border-bottom:1px solid #d1d1d1;border-top:0;vertical-align:top}.ngx-datatable.patternfly .datatable-body-row.datatable-row-even{background-color:transparent!important}.ngx-datatable.patternfly .datatable-body-row.datatable-row-even:active,.ngx-datatable.patternfly .datatable-body-row.datatable-row-even:hover,.ngx-datatable.patternfly .datatable-body-row.datatable-row-odd:active,.ngx-datatable.patternfly .datatable-body-row.datatable-row-odd:hover{background-color:#def3ff!important;border-bottom-color:#7dc3e8}.ngx-datatable.patternfly .datatable-body-row.datatable-row-odd{background-color:#f5f5f5!important}.ngx-datatable.patternfly .datatable-body-row.active{background-color:#0088ce!important;border-bottom-color:#00659c!important;color:#fff}.ngx-datatable.patternfly .datatable-body-row.active:hover{background-color:#0088ce!important}.ngx-datatable.patternfly .datatable-body-row .datatable-body-cell{padding:2px 10px 3px;text-align:left;vertical-align:top}.ngx-datatable.patternfly .datatable-body-row .datatable-body-cell.pfng-table-dnd-only{padding-left:0;padding-right:0}.ngx-datatable.patternfly .datatable-body .datatable-row-wrapper,.ngx-datatable.patternfly .datatable-body .datatable-scroll{width:100%!important}.ngx-datatable.patternfly .datatable-body .datatable-group-header{background:#f5f5f5;border-bottom:solid 1px #d1d1d1;border-left:solid 1px #d1d1d1;border-right:solid 1px #d1d1d1;width:100%!important}.ngx-datatable.patternfly .datatable-body .empty-row{border-bottom:1px solid #d1d1d1;border-left:1px solid #d1d1d1;border-right:1px solid #d1d1d1;margin-bottom:5px;padding:2px 10px 1px}"],
            template: "<div class=\"pfng-table\"><pfng-toolbar [config]=\"config.toolbarConfig\" [actionTemplate]=\"actionTemplate\" (onActionSelect)=\"handleAction($event)\" (onFilterChange)=\"handleFilterChange($event)\" (onFilterFieldSelect)=\"handleFilterFieldSelect($event)\" (onFilterTypeAhead)=\"handleFilterTypeAhead($event)\" (onSortChange)=\"handleSortChange($event)\" (onViewSelect)=\"handleViewSelect($event)\" *ngIf=\"config.toolbarConfig !== undefined\"></pfng-toolbar><div *ngIf=\"hasData\"><ngx-datatable #datatable [columns]=\"cols\" [columnMode]=\"dataTableConfig.columnMode\" [count]=\"dataTableConfig.count\" [cssClasses]=\"dataTableConfig.cssClasses\" [displayCheck]=\"dataTableConfig.displayCheck\" [dragulaClassSelector]=\"'pfng-table-dnd-header'\" [dragulaModel]=\"rowsModel\" [dragulaName]=\"dragulaName\" [externalPaging]=\"dataTableConfig.externalPaging\" [externalSorting]=\"dataTableConfig.externalSorting\" [footerHeight]=\"dataTableConfig.footerHeight\" [groupExpansionDefault]=\"dataTableConfig.groupExpansionDefault\" [groupRowsBy]=\"dataTableConfig.groupRowsBy\" [headerHeight]=\"dataTableConfig.headerHeight\" [messages]=\"dataTableConfig.messages\" [ngClass]=\"config.styleClass\" [limit]=\"dataTableConfig.limit\" [loadingIndicator]=\"dataTableConfig.loadingIndicator\" [offset]=\"dataTableConfig.offset\" [reorderable]=\"dataTableConfig.reorderable\" [rowClass]=\"dataTableConfig.rowClass\" [rowHeight]=\"dataTableConfig.rowHeight\" [rowIdentity]=\"dataTableConfig.rowIdentity\" [rows]=\"rows\" [scrollbarH]=\"dataTableConfig.scrollbarH\" [scrollbarV]=\"dataTableConfig.scrollbarV\" [selectAllRowsOnPage]=\"dataTableConfig.selectAllRowsOnPage\" [selectCheck]=\"dataTableConfig.selectCheck\" [selected]=\"selectedRows\" [selectionType]=\"dataTableConfig.selectionType\" [sorts]=\"dataTableConfig.sorts\" [sortType]=\"dataTableConfig.sortType\" [trackByProp]=\"dataTableConfig.trackByProp\" [virtualization]=\"dataTableConfig.virtualization\" (activate)=\"handleActivate($event)\" (dragulaDrop)=\"handleDragulaDrop($event)\" (dragulaDrag)=\"handleDragulaDrag($event)\" (reorder)=\"handleReorder($event)\" (resize)=\"handleResize($event)\" (scroll)=\"handleScroll($event)\" (tableContextmenu)=\"handleOnTableContextMenu($event)\" *ngIf=\"showTable\"><ng-template #selectHeadTemplate><span class=\"margin-left-5\" *ngIf=\"config.dragEnabled === true\"></span> <span class=\"margin-left-16\" *ngIf=\"config.useExpandRows === true\"><span class=\"pfng-list-expand-placeholder\"></span> </span><input type=\"checkbox\" value=\"allRowsSelected\" title=\"{{(allRowsSelected) ? 'Deselect' : 'Select'}} All Rows\" [disabled]=\"rows.length === 0\" [(ngModel)]=\"allRowsSelected\" (ngModelChange)=\"selectionsChange()\" *ngIf=\"config.showCheckbox === true\"></ng-template><ng-template #selectCellTemplate let-row=\"row\" let-expanded=\"expanded\"><span class=\"pfng-table-dnd-container\" *ngIf=\"config.dragEnabled === true\"><span class=\"pfng-table-dnd-header\"></span> </span><span [ngClass]=\"{'margin-left-5': config.dragEnabled === true}\" *ngIf=\"config.useExpandRows === true\"><span class=\"pfng-list-expand-placeholder\" *ngIf=\"row.hideExpandToggle === true\"></span> <span class=\"fa\" [ngClass]=\"{'fa-angle-down': expanded, 'fa-angle-right margin-right-4': !expanded}\" (click)=\"toggleExpandRow(row)\" *ngIf=\"row.hideExpandToggle !== true\"></span> </span><span [ngClass]=\"{'margin-left-5': config.dragEnabled === true || config.useExpandRows === true}\" *ngIf=\"config.showCheckbox === true\"><input type=\"checkbox\" value=\"row.selected\" title=\"{{(row.selected) ? 'Deselect' : 'Select'}} Row\" [(ngModel)]=\"row.selected\" (ngModelChange)=\"selectionChange(row)\"></span></ng-template><ngx-datatable-group-header [rowHeight]=\"dataTableConfig.rowHeight\" *ngIf=\"groupHeaderTemplate !== undefined\"><ng-template let-group=\"group\" let-expanded=\"expanded\" ngx-datatable-group-header-template><span class=\"margin-5\"><span class=\"fa\" [ngClass]=\"{'fa-angle-down': expanded, 'fa-angle-right margin-right-4': !expanded}\" (click)=\"toggleExpandGroup(group)\"></span></span><ng-template [ngTemplateOutlet]=\"groupHeaderTemplate\" [ngTemplateOutletContext]=\"{ group: group, expanded: expanded }\"></ng-template></ng-template></ngx-datatable-group-header><ngx-datatable-row-detail [rowHeight]=\"auto\" *ngIf=\"expandRowTemplate !== undefined\"><ng-template let-row=\"row\" let-expanded=\"expanded\" ngx-datatable-row-detail-template><div class=\"pfng-table-expand-container\" tabindex=\"0\"><div class=\"pfng-table-expand-content\" style=\"flex-grow: 1\"><div class=\"close\" *ngIf=\"config.hideClose !== true\"><span class=\"pficon pficon-close\" (click)=\"toggleExpandRow(row)\"></span></div><ng-template [ngTemplateOutlet]=\"expandRowTemplate\" [ngTemplateOutletContext]=\"{ row: row, expanded: expanded }\"></ng-template></div></div></ng-template></ngx-datatable-row-detail></ngx-datatable><pfng-pagination [config]=\"config.paginationConfig\" (onPageNumberChange)=\"handlePageNumber($event)\" (onPageSizeChange)=\"handlePageSize($event)\" *ngIf=\"config.paginationConfig !== undefined\"></pfng-pagination></div><pfng-empty-state [config]=\"config.emptyStateConfig\" (onActionSelect)=\"handleAction($event)\" *ngIf=\"!hasData\"></pfng-empty-state></div>"
        }),
        __metadata("design:paramtypes", [DragulaService])
    ], TableComponent);
    return TableComponent;
}(TableBase));
export { TableComponent };
//# sourceMappingURL=table.component.js.map