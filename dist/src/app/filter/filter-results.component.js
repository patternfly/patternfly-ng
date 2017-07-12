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
import { cloneDeep, defaults, isEqual } from 'lodash';
/**
 * Component for the filter results
 */
var FilterResultsComponent = (function () {
    /**
     * The default constructor
     */
    function FilterResultsComponent() {
        /**
         * The event emitted when the clear action is selected
         */
        this.onClear = new EventEmitter();
        this.defaultConfig = {};
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    FilterResultsComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if the component config has changed
     */
    FilterResultsComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    FilterResultsComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
        if (this.config && this.config.appliedFilters === undefined) {
            this.config.appliedFilters = [];
        }
        if (this.config && this.config.resultsCount === undefined) {
            this.config.resultsCount = 0;
        }
        if (this.config && this.config.selectedCount === undefined) {
            this.config.selectedCount = 0;
        }
        if (this.config && this.config.totalCount === undefined) {
            this.config.totalCount = 0;
        }
    };
    // Private
    FilterResultsComponent.prototype.clearFilter = function (filter) {
        var newFilters = [];
        this.config.appliedFilters.forEach(function (appliedFilter) {
            if (appliedFilter.field.title !== filter.field.title
                || appliedFilter.value !== filter.value) {
                newFilters.push(appliedFilter);
            }
        });
        this.config.appliedFilters = newFilters;
        this.onClear.emit(this.config.appliedFilters);
    };
    FilterResultsComponent.prototype.clearAllFilters = function () {
        this.config.appliedFilters = [];
        this.onClear.emit(this.config.appliedFilters);
    };
    return FilterResultsComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", FilterConfig)
], FilterResultsComponent.prototype, "config", void 0);
__decorate([
    Output('onClear'),
    __metadata("design:type", Object)
], FilterResultsComponent.prototype, "onClear", void 0);
FilterResultsComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-filter-results',
        styles: [".filter-pf a{cursor:pointer}"],
        template: "<div class=\"filter-pf\" *ngIf=\"config && config.appliedFilters && config.appliedFilters.length > 0\"><div class=\"row toolbar-pf-results\"><div class=\"col-sm-12\"><h5 *ngIf=\"config.resultsCount >= 0\">{{config.resultsCount}} Results</h5><p *ngIf=\"config.appliedFilters.length > 0\">Active filters:</p><ul class=\"list-inline\"><li *ngFor=\"let filter of config.appliedFilters\"><span class=\"active-filter label label-info\">{{filter.field.title}}: {{filter.value}} <a><span class=\"pficon pficon-close\" (click)=\"clearFilter(filter)\"></span></a></span></li></ul><p><a class=\"clear-filters\" (click)=\"clearAllFilters()\" *ngIf=\"config.appliedFilters.length > 0\">Clear All Filters</a></p><div *ngIf=\"config.totalCount !== 0\" class=\"pf-table-view-selected-label\"><strong>{{config.selectedCount}}</strong> of <strong>{{config.totalCount}}</strong> selected</div></div></div></div>"
    }),
    __metadata("design:paramtypes", [])
], FilterResultsComponent);
export { FilterResultsComponent };
//# sourceMappingURL=filter-results.component.js.map