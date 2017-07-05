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
import { cloneDeep, find, isEqual } from 'lodash';
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
        this.onAdd = new EventEmitter();
        /**
         * The event emitted when a field menu option is selected
         */
        this.onFieldSelect = new EventEmitter();
        /**
         * The event emitted when the user types ahead in the query input field
         */
        this.onTypeAhead = new EventEmitter();
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
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    FilterFieldsComponent.prototype.setupConfig = function () {
        var _this = this;
        if (this.config === undefined) {
            this.config = {};
        }
        this.prevConfig = cloneDeep(this.config);
        if (this.config && this.config.fields === undefined) {
            this.config.fields = [];
        }
        if (this.config && this.config.tooltipPlacement === undefined) {
            this.config.tooltipPlacement = 'top';
        }
        var fieldFound = false;
        if (this.currentField !== undefined) {
            find(this.config.fields, function (nextField) {
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
    Input(),
    __metadata("design:type", FilterConfig)
], FilterFieldsComponent.prototype, "config", void 0);
__decorate([
    Output('onAdd'),
    __metadata("design:type", Object)
], FilterFieldsComponent.prototype, "onAdd", void 0);
__decorate([
    Output('onFieldSelect'),
    __metadata("design:type", Object)
], FilterFieldsComponent.prototype, "onFieldSelect", void 0);
__decorate([
    Output('onTypeAhead'),
    __metadata("design:type", Object)
], FilterFieldsComponent.prototype, "onTypeAhead", void 0);
FilterFieldsComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-filter-fields',
        styles: [require('./filter-fields.component.css').toString()],
        template: require('./filter-fields.component.html')
    }),
    __metadata("design:paramtypes", [])
], FilterFieldsComponent);
export { FilterFieldsComponent };
//# sourceMappingURL=filter-fields.component.js.map