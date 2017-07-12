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
import { SortConfig } from './sort-config';
import { cloneDeep, defaults, isEqual } from 'lodash';
/**
 * Sort component
 */
var SortComponent = (function () {
    /**
     * The default constructor
     */
    function SortComponent() {
        /**
         * The event emitted when the sort has changed
         */
        this.onChange = new EventEmitter();
        this.defaultConfig = {
            isAscending: true,
            visible: true
        };
    }
    /**
     *  Setup component configuration upon initialization
     */
    SortComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if the component config has changed
     */
    SortComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    SortComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.fields && this.config.fields.length > 0) {
            if (this.currentField === undefined) {
                this.currentField = this.config.fields[0];
            }
            if (this.config.isAscending === undefined) {
                this.config.isAscending = true;
            }
        }
    };
    // Actions
    SortComponent.prototype.getIconStyleClass = function () {
        var iconStyleClass;
        if (this.currentField && this.currentField.sortType
            && this.currentField.sortType === 'numeric') {
            if (this.config.isAscending) {
                iconStyleClass = 'fa fa-sort-numeric-asc';
            }
            else {
                iconStyleClass = 'fa fa-sort-numeric-desc';
            }
        }
        else {
            if (this.config.isAscending) {
                iconStyleClass = 'fa fa-sort-alpha-asc';
            }
            else {
                iconStyleClass = 'fa fa-sort-alpha-desc';
            }
        }
        return iconStyleClass;
    };
    SortComponent.prototype.onChangeDirection = function () {
        this.config.isAscending = !this.config.isAscending;
        this.onChange.emit({
            field: this.currentField,
            isAscending: this.config.isAscending
        });
    };
    SortComponent.prototype.selectField = function (field) {
        this.currentField = field;
        this.onChange.emit({
            field: this.currentField,
            isAscending: this.config.isAscending
        });
    };
    return SortComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", SortConfig)
], SortComponent.prototype, "config", void 0);
__decorate([
    Output('onChange'),
    __metadata("design:type", Object)
], SortComponent.prototype, "onChange", void 0);
SortComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-sort',
        styles: [".sort-pf .btn-link{margin-left:10px;padding:4px 0;min-width:0;color:#030303;font-size:16px;line-height:1}.sort-pf .btn-link:hover{color:#0088ce}"],
        template: "<div class=\"sort-pf\" *ngIf=\"config?.visible !== false\"><div class=\"btn-group dropdown\" dropdown><button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdownToggle>{{currentField?.title}} <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngFor=\"let item of config?.fields\" [ngClass]=\"{'selected': item === currentField}\"><a href=\"javascript:void(0);\" class=\"sortfield sort-field dropdown-item\" tabindex=\"-1\" (click)=\"selectField(item)\">{{item?.title}}</a></li></ul></div><button class=\"btn btn-link\" type=\"button\" (click)=\"onChangeDirection()\"><span class=\"sort-direction\" [ngClass]=\"getIconStyleClass()\"></span></button></div>"
    }),
    __metadata("design:paramtypes", [])
], SortComponent);
export { SortComponent };
//# sourceMappingURL=sort.component.js.map