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
 * Component for the filter bar's filter entry components
 */
var FilterComponent = (function () {
    function FilterComponent() {
        this.onChange = new core_1.EventEmitter();
        this.onFilterSelect = new core_1.EventEmitter();
        this.onTypeAhead = new core_1.EventEmitter();
    }
    // Initialization
    FilterComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    FilterComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!lodash_1.isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    FilterComponent.prototype.setupConfig = function () {
        if (this.config === undefined) {
            this.config = {};
        }
        this.prevConfig = lodash_1.cloneDeep(this.config);
        if (this.config && this.config.appliedFilters === undefined) {
            this.config.appliedFilters = [];
        }
    };
    // Filter functions
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
    FilterComponent.prototype.fieldSelected = function ($event) {
        this.onFilterSelect.emit($event);
    };
    FilterComponent.prototype.filterExists = function (filter) {
        var foundFilter = lodash_1.find(this.config.appliedFilters, {
            value: filter.value
        });
        return foundFilter !== undefined;
    };
    FilterComponent.prototype.typeAhead = function ($event) {
        this.onTypeAhead.emit($event);
    };
    // Private
    FilterComponent.prototype.enforceSingleSelect = function (filter) {
        lodash_1.remove(this.config.appliedFilters, { title: filter.field.title });
    };
    return FilterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", filter_config_1.FilterConfig)
], FilterComponent.prototype, "config", void 0);
__decorate([
    core_1.Output('onChange'),
    __metadata("design:type", Object)
], FilterComponent.prototype, "onChange", void 0);
__decorate([
    core_1.Output('onFieldSelect'),
    __metadata("design:type", Object)
], FilterComponent.prototype, "onFilterSelect", void 0);
__decorate([
    core_1.Output('onTypeAhead'),
    __metadata("design:type", Object)
], FilterComponent.prototype, "onTypeAhead", void 0);
FilterComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'pfng-filter',
        styles: [require('./filter.component.css').toString()],
        template: require('./filter.component.html')
    }),
    __metadata("design:paramtypes", [])
], FilterComponent);
exports.FilterComponent = FilterComponent;
//# sourceMappingURL=filter.component.js.map