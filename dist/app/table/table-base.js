var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventEmitter, Input, Output, TemplateRef } from '@angular/core';
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
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], TableBase.prototype, "actionTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], TableBase.prototype, "viewTemplate", void 0);
    __decorate([
        Output('onDrop'),
        __metadata("design:type", Object)
    ], TableBase.prototype, "onDrop", void 0);
    __decorate([
        Output('onPageSizeChange'),
        __metadata("design:type", Object)
    ], TableBase.prototype, "onPageSizeChange", void 0);
    __decorate([
        Output('onPageNumberChange'),
        __metadata("design:type", Object)
    ], TableBase.prototype, "onPageNumberChange", void 0);
    __decorate([
        Output('onActionSelect'),
        __metadata("design:type", Object)
    ], TableBase.prototype, "onActionSelect", void 0);
    __decorate([
        Output('onFilterFieldSelect'),
        __metadata("design:type", Object)
    ], TableBase.prototype, "onFilterFieldSelect", void 0);
    __decorate([
        Output('onFilterChange'),
        __metadata("design:type", Object)
    ], TableBase.prototype, "onFilterChange", void 0);
    __decorate([
        Output('onFilterSave'),
        __metadata("design:type", Object)
    ], TableBase.prototype, "onFilterSave", void 0);
    __decorate([
        Output('onFilterTypeAhead'),
        __metadata("design:type", Object)
    ], TableBase.prototype, "onFilterTypeAhead", void 0);
    __decorate([
        Output('onSelectionChange'),
        __metadata("design:type", Object)
    ], TableBase.prototype, "onSelectionChange", void 0);
    __decorate([
        Output('onSortChange'),
        __metadata("design:type", Object)
    ], TableBase.prototype, "onSortChange", void 0);
    __decorate([
        Output('onViewSelect'),
        __metadata("design:type", Object)
    ], TableBase.prototype, "onViewSelect", void 0);
    return TableBase;
}());
export { TableBase };
//# sourceMappingURL=table-base.js.map