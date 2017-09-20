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
import { cloneDeep, defaults, find, isEqual } from 'lodash';
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
        this.defaultConfig = {};
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
    /**
     * Set up default config
     */
    FilterFieldsComponent.prototype.setupConfig = function () {
        var _this = this;
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
        if (this.config && this.config.fields === undefined) {
            this.config.fields = [];
        }
        if (this.config && this.config.tooltipPlacement === undefined) {
            this.config.tooltipPlacement = 'top';
        }
        var fieldFound = false;
        if (this._currentField !== undefined) {
            find(this.config.fields, function (nextField) {
                if (nextField.id === _this._currentField.id) {
                    fieldFound = true;
                    return;
                }
            });
        }
        if (!fieldFound) {
            this._currentField = this.config.fields[0];
            this._currentValue = null;
        }
        if (this._currentValue === undefined) {
            this._currentValue = null;
        }
    };
    Object.defineProperty(FilterFieldsComponent.prototype, "currentField", {
        // Getters & setters
        /**
         * Get the current filter field
         *
         * @returns {FilterField} The current filter field
         */
        get: function () {
            return this._currentField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterFieldsComponent.prototype, "currentValue", {
        /**
         * Get the current filter field value
         *
         * @returns {string} The current filter field value
         */
        get: function () {
            return this._currentValue;
        },
        /**
         * Set the current filter field value
         *
         * @param val The current filter field value
         */
        set: function (val) {
            this._currentValue = val;
        },
        enumerable: true,
        configurable: true
    });
    // Private
    FilterFieldsComponent.prototype.fieldInputKeyPress = function ($event) {
        if ($event.which === 13 && this._currentValue && this._currentValue.length > 0) {
            this.onAdd.emit({
                field: this._currentField,
                value: this._currentValue
            });
            this._currentValue = undefined;
        }
    };
    FilterFieldsComponent.prototype.queryInputChange = function (value) {
        this.onTypeAhead.emit({
            field: this._currentField,
            value: this._currentValue
        });
    };
    FilterFieldsComponent.prototype.selectField = function (field) {
        this._currentField = field;
        this._currentValue = null;
        this.onFieldSelect.emit({
            field: this._currentField,
            value: this._currentValue
        });
    };
    FilterFieldsComponent.prototype.selectQuery = function (filterQuery) {
        if (filterQuery != null) {
            this.onAdd.emit({
                field: this._currentField,
                query: filterQuery,
                value: filterQuery.value
            });
            this._currentValue = null;
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
        styles: [".filter-pf a{cursor:pointer}.filter-pf.filter-fields .form-group{padding-left:0;width:275px}.filter-pf.filter-fields .tooltip{white-space:nowrap}.filter-pf.filter-fields .typeahead-input-container{position:relative;padding-right:0}.filter-pf.filter-fields .typeahead-input-container .caret{color:#8b8d8f;font-style:italic;position:absolute;top:10px;right:12px;z-index:2}.filter-select .btn-default{background-color:#fff;background-image:none;color:#8b8d8f;font-style:italic;font-weight:400}.filter-select .avatar{height:20px;margin-right:5px}.input-group .input-group-btn .dropdown-menu>.selected>a{background-color:#0088ce!important;border-color:#0088ce!important;color:#fff}"],
        template: "<div class=\"filter-pf filter-fields\"><div class=\"input-group form-group\"><div class=\"input-group-btn\" dropdown><button type=\"button\" class=\"btn btn-default filter-fields dropdown-toggle\" dropdownToggle tooltip=\"Filter by\" placement=\"{{config?.tooltipPlacement}}\">{{currentField?.title}} <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngFor=\"let field of config?.fields\"><a class=\"filter-field dropdown-item\" role=\"menuitem\" tabindex=\"-1\" (click)=\"selectField(field)\">{{field?.title}}</a></li></ul></div><div *ngIf=\"!currentField?.type || currentField?.type === 'text' || currentField.type === 'default'\"><input class=\"form-control\" type=\"{{currentField?.type}}\" [(ngModel)]=\"currentValue\" placeholder=\"{{currentField?.placeholder}}\" (keypress)=\"fieldInputKeyPress($event)\"></div><div *ngIf=\"currentField?.type === 'select'\"><div class=\"btn-group bootstrap-select form-control filter-select\" dropdown><button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdownToggle><span class=\"filter-option pull-left\">{{currentValue || currentField?.placeholder}}</span> <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngIf=\"currentField?.placeholder\"><a class=\"dropdown-item\" tabindex=\"-1\" (click)=\"selectQuery()\">{{currentField?.placeholder}}</a></li><li role=\"menuitem\" *ngFor=\"let query of currentField?.queries\" [ngClass]=\"{'selected': query?.value === currentValue, 'divider dropdown-divider': query?.separator}\"><a class=\"dropdown-item\" tabindex=\"-1\" (click)=\"selectQuery(query)\" *ngIf=\"!query?.separator\"><span class=\"{{query?.iconStyleClass}}\" *ngIf=\"query?.iconStyleClass\"></span> <img class=\"avatar\" [attr.src]=\"query?.imageUrl\" *ngIf=\"query?.imageUrl\"> {{query.value}}</a></li></ul></div></div><div *ngIf=\"currentField?.type === 'typeahead'\"><div class=\"btn-group bootstrap-select form-control filter-select\" dropdown><div class=\"pull-left typeahead-input-container dropdown-toggle\" dropdownToggle><input #queryInput class=\"form-control\" type=\"text\" placeholder=\"{{currentField?.placeholder}}\" [(ngModel)]=\"currentValue\" (ngModelChange)=\"queryInputChange($event)\"> <span (click)=\"queryInput.focus()\" class=\"caret\"></span></div><ul class=\"dropdown-menu\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngIf=\"currentField.placeholder\"><a class=\"dropdown-item\" tabindex=\"-1\" (click)=\"selectQuery()\">{{currentField?.placeholder}}</a></li><li role=\"menuitem\" *ngFor=\"let query of currentField?.queries\" [ngClass]=\"{'selected': query.value === currentValue, 'divider dropdown-divider': query?.separator}\"><a class=\"dropdown-item\" tabindex=\"-1\" (click)=\"selectQuery(query)\" *ngIf=\"!query?.separator\"><span class=\"{{query?.iconStyleClass}}\" *ngIf=\"query?.iconStyleClass\"></span> <img class=\"avatar\" [attr.src]=\"query?.imageUrl\" *ngIf=\"query?.imageUrl\"> <span [innerHTML]=\"query.value | SearchHighlight: queryInput.value\"></span></a></li></ul></div></div></div></div>"
    }),
    __metadata("design:paramtypes", [])
], FilterFieldsComponent);
export { FilterFieldsComponent };
//# sourceMappingURL=filter-fields.component.js.map