var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, find, isEqual, remove } from 'lodash';
import { FilterConfig } from './filter-config';
import { FilterFieldsComponent } from './filter-fields.component';
import { FilterType } from './filter-type';
/**
 * Filter component
 */
var FilterComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function FilterComponent() {
        /**
         * The event emitted when a filter has been changed
         */
        this.onChange = new EventEmitter();
        /**
         * The event emitted when a query (i.e., saved filter) has been deleted
         */
        this.onDelete = new EventEmitter();
        /**
         * The event emitted when a field menu option is selected
         */
        this.onFilterSelect = new EventEmitter();
        /**
         * The event emitted when a filter has been changed
         */
        this.onSave = new EventEmitter();
        /**
         * The event emitted when the user types ahead in the query input field
         */
        this.onTypeAhead = new EventEmitter();
        this.defaultConfig = {
            disabled: false
        };
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    FilterComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    FilterComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    FilterComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.appliedFilters === undefined) {
            this.config.appliedFilters = [];
        }
        this.prevConfig = cloneDeep(this.config);
    };
    // Actions
    /**
     * Handle add filter event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    FilterComponent.prototype.addFilter = function ($event) {
        var newFilter = {
            field: $event.field,
            query: $event.query,
            value: $event.value
        };
        if (!this.filterExists(newFilter)) {
            if (newFilter.field.type === FilterType.SELECT) {
                this.enforceSingleSelect(newFilter);
            }
            this.config.appliedFilters.push(newFilter);
            $event.appliedFilters = this.config.appliedFilters;
            this.onChange.emit($event);
        }
    };
    /**
     * Handle clear filter event
     *
     * @param $event An array of current Filter objects
     */
    FilterComponent.prototype.clearFilter = function ($event) {
        this.config.appliedFilters = $event;
        this.onChange.emit({
            appliedFilters: $event
        });
    };
    /**
     * Handle delete query (i.e., saved filter) event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    FilterComponent.prototype.deleteQuery = function ($event) {
        this.onDelete.emit($event);
    };
    /**
     * Handle filter field selected event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    FilterComponent.prototype.fieldSelected = function ($event) {
        this.onFilterSelect.emit($event);
    };
    /**
     * Reset current field
     */
    FilterComponent.prototype.resetCurrentField = function () {
        this.filterFields.reset();
    };
    /**
     * Handle save filter event
     *
     * @param $event An array of current Filter objects
     */
    FilterComponent.prototype.saveFilter = function ($event) {
        this.onSave.emit($event);
    };
    /**
     * Handle type ahead event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    FilterComponent.prototype.typeAhead = function ($event) {
        this.onTypeAhead.emit($event);
    };
    // Private
    FilterComponent.prototype.enforceSingleSelect = function (filter) {
        remove(this.config.appliedFilters, { title: filter.field.title });
    };
    FilterComponent.prototype.filterExists = function (filter) {
        var foundFilter = find(this.config.appliedFilters, {
            field: filter.field,
            value: filter.value
        });
        return foundFilter !== undefined;
    };
    __decorate([
        Input(),
        __metadata("design:type", FilterConfig)
    ], FilterComponent.prototype, "config", void 0);
    __decorate([
        Output('onChange'),
        __metadata("design:type", Object)
    ], FilterComponent.prototype, "onChange", void 0);
    __decorate([
        Output('onDelete'),
        __metadata("design:type", Object)
    ], FilterComponent.prototype, "onDelete", void 0);
    __decorate([
        Output('onFieldSelect'),
        __metadata("design:type", Object)
    ], FilterComponent.prototype, "onFilterSelect", void 0);
    __decorate([
        Output('onSave'),
        __metadata("design:type", Object)
    ], FilterComponent.prototype, "onSave", void 0);
    __decorate([
        Output('onTypeAhead'),
        __metadata("design:type", Object)
    ], FilterComponent.prototype, "onTypeAhead", void 0);
    __decorate([
        ViewChild('filterFields'),
        __metadata("design:type", FilterFieldsComponent)
    ], FilterComponent.prototype, "filterFields", void 0);
    FilterComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-filter',
            template: "<div class=\"filter-pf\"><pfng-filter-fields #filterFields [config]=\"config\" (onAdd)=\"addFilter($event)\" (onDelete)=\"deleteQuery($event)\" (onFieldSelect)=\"fieldSelected($event)\" (onTypeAhead)=\"typeAhead($event)\"></pfng-filter-fields><pfng-filter-results [config]=\"config\" (onClear)=\"clearFilter($event)\" (onSave)=\"saveFilter($event)\"></pfng-filter-results></div>"
        }),
        __metadata("design:paramtypes", [])
    ], FilterComponent);
    return FilterComponent;
}());
export { FilterComponent };
//# sourceMappingURL=filter.component.js.map