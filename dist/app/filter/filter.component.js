import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, find, isEqual, remove } from 'lodash';
import { FilterType } from './filter-type';
/**
 * Filter component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { FilterModule } from 'patternfly-ng/filter';
 * // Or
 * import { FilterModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [FilterModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import {
 *   Filter,
 *   FilterConfig,
 *   FilterField,
 *   FilterEvent,
 *   FilterType
 * } from 'patternfly-ng/filter';
 * </pre></code>
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
            if (newFilter.field.type === FilterType.SELECT || newFilter.field.type === FilterType.TYPEAHEAD) {
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
        var filterField = { title: filter.field.title };
        remove(this.config.appliedFilters, { field: filterField });
    };
    FilterComponent.prototype.filterExists = function (filter) {
        var foundFilter = find(this.config.appliedFilters, {
            field: filter.field,
            value: filter.value
        });
        return foundFilter !== undefined;
    };
    FilterComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-filter',
                    template: "<div class=\"filter-pf\"><pfng-filter-fields #filterFields [config]=\"config\" (onAdd)=\"addFilter($event)\" (onDelete)=\"deleteQuery($event)\" (onFieldSelect)=\"fieldSelected($event)\" (onTypeAhead)=\"typeAhead($event)\"></pfng-filter-fields><pfng-filter-results [config]=\"config\" (onClear)=\"clearFilter($event)\" (onSave)=\"saveFilter($event)\"></pfng-filter-results></div>"
                },] },
    ];
    /** @nocollapse */
    FilterComponent.ctorParameters = function () { return []; };
    FilterComponent.propDecorators = {
        'config': [{ type: Input },],
        'onChange': [{ type: Output, args: ['onChange',] },],
        'onDelete': [{ type: Output, args: ['onDelete',] },],
        'onFilterSelect': [{ type: Output, args: ['onFieldSelect',] },],
        'onSave': [{ type: Output, args: ['onSave',] },],
        'onTypeAhead': [{ type: Output, args: ['onTypeAhead',] },],
        'filterFields': [{ type: ViewChild, args: ['filterFields',] },],
    };
    return FilterComponent;
}());
export { FilterComponent };
//# sourceMappingURL=filter.component.js.map