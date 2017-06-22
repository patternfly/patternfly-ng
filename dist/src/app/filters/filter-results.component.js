"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var filter_config_1 = require("./filter-config");
var lodash_1 = require("lodash");
/**
 * Component for the filter results
 */
var FilterResultsComponent = (function () {
    function FilterResultsComponent() {
        this.onClear = new core_1.EventEmitter();
    }
    // Initialization
    FilterResultsComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    FilterResultsComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!lodash_1.isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    FilterResultsComponent.prototype.setupConfig = function () {
        if (this.config === undefined) {
            this.config = {};
        }
        this.prevConfig = lodash_1.cloneDeep(this.config);
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
    // Result functions
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
    core_1.Input(),
    __metadata("design:type", filter_config_1.FilterConfig)
], FilterResultsComponent.prototype, "config", void 0);
__decorate([
    core_1.Output('onClear'),
    __metadata("design:type", Object)
], FilterResultsComponent.prototype, "onClear", void 0);
FilterResultsComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'pfng-filter-results',
        styles: [require('./filter-results.component.css').toString()],
        template: require('./filter-results.component.html')
    }),
    __metadata("design:paramtypes", [])
], FilterResultsComponent);
exports.FilterResultsComponent = FilterResultsComponent;
//# sourceMappingURL=filter-results.component.js.map