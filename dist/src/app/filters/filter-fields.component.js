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
var _ = require("lodash");
/**
 * Component for the filter bar's filter entry components
 */
var FilterFieldsComponent = (function () {
    function FilterFieldsComponent() {
        this.onAdd = new core_1.EventEmitter();
        this.onFilterQueries = new core_1.EventEmitter();
        this.onFieldSelect = new core_1.EventEmitter();
        this.show = false;
    }
    // Initialization
    FilterFieldsComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    FilterFieldsComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!_.isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    FilterFieldsComponent.prototype.setupConfig = function () {
        var _this = this;
        if (this.config === undefined) {
            this.config = {};
        }
        this.prevConfig = _.cloneDeep(this.config);
        if (this.config && this.config.fields === undefined) {
            this.config.fields = [];
        }
        if (this.config && this.config.tooltipPlacement === undefined) {
            this.config.tooltipPlacement = 'top';
        }
        var fieldFound = false;
        if (this.currentField !== undefined) {
            _.find(this.config.fields, function (nextField) {
                if (nextField.id === _this.currentField.id) {
                    fieldFound = true;
                    return;
                }
            });
        }
        if (!fieldFound) {
            this.currentField = this.config.fields[0];
            this.currentValue = null;
        }
        if (this.currentValue === undefined) {
            this.currentValue = null;
        }
    };
    // Field functions
    FilterFieldsComponent.prototype.filterQueries = function (value) {
        this.onFilterQueries.emit({
            field: this.currentField,
            value: this.currentValue
        });
    };
    FilterFieldsComponent.prototype.onValueKeyPress = function (keyEvent) {
        if (keyEvent.which === 13) {
            this.onAdd.emit({
                field: this.currentField,
                value: this.currentValue
            });
            this.currentValue = undefined;
        }
    };
    FilterFieldsComponent.prototype.selectField = function (field) {
        this.currentField = field;
        this.currentValue = null;
        this.onFieldSelect.emit({
            field: this.currentField,
            value: this.currentValue
        });
    };
    FilterFieldsComponent.prototype.selectValue = function (filterQuery) {
        if (filterQuery != null) {
            this.onAdd.emit({
                field: this.currentField,
                query: filterQuery,
                value: filterQuery.value
            });
            this.currentValue = null;
        }
    };
    return FilterFieldsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", filter_config_1.FilterConfig)
], FilterFieldsComponent.prototype, "config", void 0);
__decorate([
    core_1.Output('onAdd'),
    __metadata("design:type", Object)
], FilterFieldsComponent.prototype, "onAdd", void 0);
__decorate([
    core_1.Output('onFilterQueries'),
    __metadata("design:type", Object)
], FilterFieldsComponent.prototype, "onFilterQueries", void 0);
__decorate([
    core_1.Output('onFieldSelect'),
    __metadata("design:type", Object)
], FilterFieldsComponent.prototype, "onFieldSelect", void 0);
FilterFieldsComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'pfng-filter-fields',
        styles: [require('./filter-fields.component.css').toString()],
        template: require('./filter-fields.component.html')
    }),
    __metadata("design:paramtypes", [])
], FilterFieldsComponent);
exports.FilterFieldsComponent = FilterFieldsComponent;
//# sourceMappingURL=filter-fields.component.js.map