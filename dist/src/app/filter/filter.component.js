var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FilterConfig } from './filter-config';
import { cloneDeep, find, isEqual, remove } from 'lodash';
/**
 * Filter component
 */
var FilterComponent = (function () {
    /**
     * The default constructor
     */
    function FilterComponent() {
        /**
         * The event emitted when a filter has been changed
         */
        this.onChange = new EventEmitter();
        /**
         * The event emitted when a field menu option is selected
         */
        this.onFilterSelect = new EventEmitter();
        /**
         * The event emitted when the user types ahead in the query input field
         */
        this.onTypeAhead = new EventEmitter();
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    FilterComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if the component config has changed
     */
    FilterComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    FilterComponent.prototype.setupConfig = function () {
        if (this.config === undefined) {
            this.config = {};
        }
        this.prevConfig = cloneDeep(this.config);
        if (this.config && this.config.appliedFilters === undefined) {
            this.config.appliedFilters = [];
        }
    };
    // Actions
    FilterComponent.prototype.addFilter = function ($event) {
        var newFilter = {
            field: $event.field,
            query: $event.query,
            value: $event.value
        };
        if (!this.filterExists(newFilter)) {
            if (newFilter.field.type === 'select') {
                this.enforceSingleSelect(newFilter);
            }
            this.config.appliedFilters.push(newFilter);
            $event.appliedFilters = this.config.appliedFilters;
            this.onChange.emit($event);
        }
    };
    FilterComponent.prototype.clear = function ($event) {
        this.config.appliedFilters = $event;
        this.onChange.emit({
            appliedFilters: $event
        });
    };
    FilterComponent.prototype.enforceSingleSelect = function (filter) {
        remove(this.config.appliedFilters, { title: filter.field.title });
    };
    FilterComponent.prototype.fieldSelected = function ($event) {
        this.onFilterSelect.emit($event);
    };
    FilterComponent.prototype.filterExists = function (filter) {
        var foundFilter = find(this.config.appliedFilters, {
            value: filter.value
        });
        return foundFilter !== undefined;
    };
    FilterComponent.prototype.typeAhead = function ($event) {
        this.onTypeAhead.emit($event);
    };
    return FilterComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", FilterConfig)
], FilterComponent.prototype, "config", void 0);
__decorate([
    Output('onChange'),
    __metadata("design:type", Object)
], FilterComponent.prototype, "onChange", void 0);
__decorate([
    Output('onFieldSelect'),
    __metadata("design:type", Object)
], FilterComponent.prototype, "onFilterSelect", void 0);
__decorate([
    Output('onTypeAhead'),
    __metadata("design:type", Object)
], FilterComponent.prototype, "onTypeAhead", void 0);
FilterComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-filter',
        styles: [require('./filter.component.css').toString()],
        template: require('./filter.component.html')
    }),
    __metadata("design:paramtypes", [])
], FilterComponent);
export { FilterComponent };
//# sourceMappingURL=filter.component.js.map