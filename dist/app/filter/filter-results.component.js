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
import { clone, cloneDeep, defaults, isEqual } from 'lodash';
import { FilterConfig } from './filter-config';
/**
 * Component for the filter results
 */
var FilterResultsComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function FilterResultsComponent() {
        /**
         * The event emitted when the clear action is selected
         */
        this.onClear = new EventEmitter();
        /**
         * The event emitted when the save action is selected
         */
        this.onSave = new EventEmitter();
        this.defaultConfig = {
            disabled: false
        };
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    FilterResultsComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
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
        this.prevConfig = cloneDeep(this.config);
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
    FilterResultsComponent.prototype.saveAllFilters = function () {
        this.onSave.emit({
            appliedFilters: this.config.appliedFilters,
            value: clone(this.saveFilterName)
        });
        this.saveFilterName = ''; // Reset
    };
    __decorate([
        Input(),
        __metadata("design:type", FilterConfig)
    ], FilterResultsComponent.prototype, "config", void 0);
    __decorate([
        Output('onClear'),
        __metadata("design:type", Object)
    ], FilterResultsComponent.prototype, "onClear", void 0);
    __decorate([
        Output('onSave'),
        __metadata("design:type", Object)
    ], FilterResultsComponent.prototype, "onSave", void 0);
    FilterResultsComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-filter-results',
            template: "<div class=\"filter-pf\" *ngIf=\"config && (config.appliedFilters && config.appliedFilters.length > 0) || config.totalCount > 0\"><div class=\"row toolbar-pf-results\"><div [ngClass]=\"{'col-sm-9': config.totalCount !== undefined, 'col-sm-12': config.totalCount === undefined}\"><h5 *ngIf=\"config.appliedFilters.length > 0 && config.resultsCount >= 0\">{{config.resultsCount}} Results</h5><p *ngIf=\"config.appliedFilters.length > 0\">Active filters:</p><ul class=\"list-inline\"><li *ngFor=\"let filter of config.appliedFilters\"><span class=\"active-filter label label-info\">{{filter.field.title}}: {{filter.value}} <span class=\"margin-left-5 pficon pficon-close\" (click)=\"clearFilter(filter)\" *ngIf=\"config.disabled !== true\"></span></span></li></ul><p><a class=\"clear-filters\" href=\"javascript:void(0)\" [class.disabled]=\"config.disabled === true\" (click)=\"config.disabled !== true && clearAllFilters()\" *ngIf=\"config.appliedFilters.length > 0\">Clear All Filters</a></p><p class=\"pfng-save-filter margin-left-10\"><ng-template #saveFilterTemplate><label class=\"control-label required-pf margin-right-15\" for=\"saveFilterName\">Name your filter</label><span class=\"pfng-save-filter-close close\"><span class=\"pficon pficon-close\" (click)=\"saveFilterPop.hide(); saveFilterName = ''\"></span></span><div class=\"margin-top-5\"><input class=\"form-control\" id=\"saveFilterName\" name=\"saveFilterName\" type=\"text\" [(ngModel)]=\"saveFilterName\"></div><div class=\"pfng-save-filter-divider\"></div><div class=\"pfng-save-filter-footer\"><button class=\"btn btn-default\" (click)=\"saveFilterPop.hide(); saveFilterName = ''\">Cancel</button> <span class=\"margin-left-5\"><button class=\"btn btn-primary\" [disabled]=\"saveFilterName === undefined || saveFilterName?.length === 0\" (click)=\"saveAllFilters(); saveFilterPop.hide()\">Save</button></span></div></ng-template><span placement=\"bottom\" [popover]=\"saveFilterTemplate\" #saveFilterPop=\"bs-popover\"><a *ngIf=\"config.showSaveFilter && config.disabled !== true\">Save Filter</a> </span><a href=\"javascript:void(0)\" [class.disabled]=\"config.disabled === true\" *ngIf=\"config.showSaveFilter && config.disabled === true\">Save Filter</a></p></div><div class=\"col-sm-3 table-view-pf-select-results\" *ngIf=\"config.totalCount > 0\"><strong>{{config.selectedCount}}</strong> of <strong>{{config.totalCount}}</strong> selected</div></div></div>"
        }),
        __metadata("design:paramtypes", [])
    ], FilterResultsComponent);
    return FilterResultsComponent;
}());
export { FilterResultsComponent };
//# sourceMappingURL=filter-results.component.js.map