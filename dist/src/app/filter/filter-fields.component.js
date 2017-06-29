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
 * Component for the filter query field and filter query dropdown
 */
var FilterFieldsComponent = (function () {
    /**
     * The default constructor
     */
    function FilterFieldsComponent() {
        /**
         * The event emitted when a filter has been added
         */
        this.onAdd = new core_1.EventEmitter();
        /**
         * The event emitted when a field menu option is selected
         */
        this.onFieldSelect = new core_1.EventEmitter();
        /**
         * The event emitted when the user types ahead in the query input field
         */
        this.onTypeAhead = new core_1.EventEmitter();
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    FilterFieldsComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if the component config has changed
     */
    FilterFieldsComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!lodash_1.isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    FilterFieldsComponent.prototype.setupConfig = function () {
        var _this = this;
        if (this.config === undefined) {
            this.config = {};
        }
        this.prevConfig = lodash_1.cloneDeep(this.config);
        if (this.config && this.config.fields === undefined) {
            this.config.fields = [];
        }
        if (this.config && this.config.tooltipPlacement === undefined) {
            this.config.tooltipPlacement = 'top';
        }
        var fieldFound = false;
        if (this.currentField !== undefined) {
            lodash_1.find(this.config.fields, function (nextField) {
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
    // Actions
    FilterFieldsComponent.prototype.fieldInputKeyPress = function ($event) {
        if ($event.which === 13) {
            this.onAdd.emit({
                field: this.currentField,
                value: this.currentValue
            });
            this.currentValue = undefined;
        }
    };
    FilterFieldsComponent.prototype.queryInputChange = function (value) {
        this.onTypeAhead.emit({
            field: this.currentField,
            value: this.currentValue
        });
    };
    FilterFieldsComponent.prototype.selectField = function (field) {
        this.currentField = field;
        this.currentValue = null;
        this.onFieldSelect.emit({
            field: this.currentField,
            value: this.currentValue
        });
    };
    FilterFieldsComponent.prototype.selectQuery = function (filterQuery) {
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
    core_1.Output('onFieldSelect'),
    __metadata("design:type", Object)
], FilterFieldsComponent.prototype, "onFieldSelect", void 0);
__decorate([
    core_1.Output('onTypeAhead'),
    __metadata("design:type", Object)
], FilterFieldsComponent.prototype, "onTypeAhead", void 0);
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