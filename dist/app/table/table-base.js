import { EventEmitter, Input, Output } from '@angular/core';
/**
 * Table base
 */
var TableBase = /** @class */ (function () {
    /**
     * The default constructor
     */
    function TableBase() {
        /**
         * The event emitted when a row has been dragged and dropped
         */
        this.onDrop = new EventEmitter();
        /**
         * The Event is emitted when Page Size is changed -- requires paginationConfig
         *
         * Not applicable with ngx-datatable page event
         */
        this.onPageSizeChange = new EventEmitter();
        /**
         * The Event is emitted when Page Number is Changed -- requires paginationConfig
         *
         * Not applicable with ngx-datatable page event
         */
        this.onPageNumberChange = new EventEmitter();
        /**
         * The event emitted when an action (e.g., button, kebab, etc.) has been selected -- requires toolbarConfig
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when a field menu option is selected -- requires toolbarConfig
         */
        this.onFilterFieldSelect = new EventEmitter();
        /**
         * The event emitted when a filter has been changed -- requires toolbarConfig
         */
        this.onFilterChange = new EventEmitter();
        /**
         * The event emitted when a filter has been saved -- requires toolbarConfig
         */
        this.onFilterSave = new EventEmitter();
        /**
         * The event emitted when the user types ahead in the query input field -- requires toolbarConfig
         */
        this.onFilterTypeAhead = new EventEmitter();
        /**
         * The event emitted when an item selection has been changed -- requires showCheckbox
         *
         * Not applicable with ngx-datatable select event
         */
        this.onSelectionChange = new EventEmitter();
        /**
         * The event emitted when the sort has changed -- requires toolbarConfig
         *
         * Not applicable with ngx-datatable sort event
         */
        this.onSortChange = new EventEmitter();
        /**
         * The event emitted when a view has been selected -- requires toolbarConfig
         */
        this.onViewSelect = new EventEmitter();
    }
    // Private
    TableBase.prototype.handleAction = function ($event) {
        this.onActionSelect.emit($event);
    };
    TableBase.prototype.handleFilterChange = function ($event) {
        this.onFilterChange.emit($event);
    };
    TableBase.prototype.handleFilterFieldSelect = function ($event) {
        this.onFilterFieldSelect.emit($event);
    };
    TableBase.prototype.handleFilterTypeAhead = function ($event) {
        this.onFilterTypeAhead.emit($event);
    };
    TableBase.prototype.handleFilterSave = function ($event) {
        this.onFilterSave.emit($event);
    };
    TableBase.prototype.handlePageSize = function ($event) {
        this.onPageSizeChange.emit($event);
    };
    TableBase.prototype.handlePageNumber = function ($event) {
        this.onPageNumberChange.emit($event);
    };
    TableBase.prototype.handleSelectionChange = function ($event) {
        this.onSelectionChange.emit($event);
    };
    TableBase.prototype.handleSortChange = function ($event) {
        this.onSortChange.emit($event);
    };
    TableBase.prototype.handleViewSelect = function ($event) {
        this.onViewSelect.emit($event);
    };
    TableBase.propDecorators = {
        'actionTemplate': [{ type: Input },],
        'viewTemplate': [{ type: Input },],
        'onDrop': [{ type: Output, args: ['onDrop',] },],
        'onPageSizeChange': [{ type: Output, args: ['onPageSizeChange',] },],
        'onPageNumberChange': [{ type: Output, args: ['onPageNumberChange',] },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
        'onFilterFieldSelect': [{ type: Output, args: ['onFilterFieldSelect',] },],
        'onFilterChange': [{ type: Output, args: ['onFilterChange',] },],
        'onFilterSave': [{ type: Output, args: ['onFilterSave',] },],
        'onFilterTypeAhead': [{ type: Output, args: ['onFilterTypeAhead',] },],
        'onSelectionChange': [{ type: Output, args: ['onSelectionChange',] },],
        'onSortChange': [{ type: Output, args: ['onSortChange',] },],
        'onViewSelect': [{ type: Output, args: ['onViewSelect',] },],
    };
    return TableBase;
}());
export { TableBase };
//# sourceMappingURL=table-base.js.map