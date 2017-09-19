var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ListBase } from '../list-base';
import { ListConfig } from './list-config';
import { cloneDeep, defaults, isEqual } from 'lodash';
/**
 * List component
 *
 * For items, use a template named itemTemplate to contain content for each item. For each item in the items array, the
 * expansion can be disabled by setting disabled to true on the item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each item. If using expand items, use a template
 * named itemExpandedTemplate to contain expandable content for each item.
 *
 * Cannot use both multi-select and double click selection at the same time
 * Cannot use both checkbox and click selection at the same time
 */
var ListComponent = (function (_super) {
    __extends(ListComponent, _super);
    /**
     * The default constructor
     */
    function ListComponent() {
        var _this = _super.call(this) || this;
        _this.defaultConfig = {
            dblClick: false,
            hideClose: false,
            multiSelect: false,
            selectedItems: [],
            selectionMatchProp: 'uuid',
            selectItems: false,
            showCheckbox: false,
            useExpandItems: false
        };
        return _this;
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    ListComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if the component config has changed
     */
    ListComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    ListComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        _super.prototype.setupConfig.call(this);
        this.prevConfig = cloneDeep(this.config);
    };
    /**
     * Return component config
     *
     * @returns {} ListConfig The component config
     */
    ListComponent.prototype.getConfig = function () {
        return this.config;
    };
    // Toggle
    ListComponent.prototype.closeExpandArea = function (item) {
        item.expandId = undefined;
        item.expanded = false;
    };
    ListComponent.prototype.toggleExpandArea = function (item) {
        // Item may already be open due to compound expansion
        if (item.expanded && item.expandId !== undefined) {
            item.expandId = undefined;
            return;
        }
        item.expandId = undefined;
        item.expanded = !item.expanded;
    };
    return ListComponent;
}(ListBase));
__decorate([
    Input(),
    __metadata("design:type", ListConfig)
], ListComponent.prototype, "config", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ListComponent.prototype, "expandTemplate", void 0);
ListComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-list',
        styles: [".pfng-list-cb-placeholder{width:12px}.pfng-list-content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.pfng-list-expand-placeholder{width:8px}.pfng-list-expansion{position:relative}.pfng-list-expansion .list-pf-content{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.pfng-list-heading{pointer-events:none}@media (max-width:992px){.pfng-list-heading{display:none}}.pfng-list-heading:hover{background-color:#fff}.pfng-list-heading i{pointer-events:auto}.pfng-list-heading.list-pf-item{border-top:none}.pfng-list-heading .list-pf-title{font-size:inherit;font-weight:400}.pfng-list-heading .list-pf-chevron+.list-pf-content,.pfng-list-heading .list-pf-select+.list-pf-content{border-left:none}"],
        template: "<div class=\"list-pf\" *ngIf=\"!itemsEmpty\"><div class=\"list-pf-item {{item?.itemStyleClass}}\" *ngFor=\"let item of items; let i = index\" [ngClass]=\"{'active': item.selected || item.isItemExpanded, 'pfng-list-heading': config.useHeading && i === 0}\"><div class=\"list-pf-container\"><div *ngIf=\"config.useHeading && i === 0; then showExpandHeader else showExpand\"></div><ng-template #showExpandHeader><div class=\"list-pf-chevron\" *ngIf=\"config.useExpandItems\"><div class=\"pfng-list-expand-placeholder\"></div></div></ng-template><ng-template #showExpand><div class=\"list-pf-chevron\" *ngIf=\"config.useExpandItems\"><div class=\"pfng-list-expand-placeholder\" *ngIf=\"item.hideExpandToggle === true\"></div><span class=\"fa fa-angle-right\" *ngIf=\"item.hideExpandToggle !== true\" (click)=\"toggleExpandArea(item)\" [ngClass]=\"{'fa-angle-down': item.expanded && item.expandId === undefined}\"></span></div></ng-template><div *ngIf=\"(config.useHeading && i === 0); then showCheckboxHeader else showCheckbox\"></div><ng-template #showCheckboxHeader><div class=\"list-pf-select\" *ngIf=\"config.showCheckbox\"><div class=\"pfng-list-cb-placeholder\"></div></div></ng-template><ng-template #showCheckbox><div class=\"list-pf-select\" *ngIf=\"config.showCheckbox\"><input type=\"checkbox\" value=\"item.selected\" [(ngModel)]=\"item.selected\" (ngModelChange)=\"checkboxChange(item)\"></div></ng-template><div class=\"list-pf-content list-pf-content-flex\"><div class=\"pfng-list-content\" (click)=\"toggleSelection($event, item)\" (dblclick)=\"dblClick($event, item)\"><ng-template *ngIf=\"itemTemplate\" [ngTemplateOutlet]=\"itemTemplate\" [ngOutletContext]=\"{ item: item, index: i }\"></ng-template></div><div class=\"list-pf-actions\"><ng-template *ngIf=\"actionTemplate\" [ngTemplateOutlet]=\"actionTemplate\" [ngOutletContext]=\"{ item: item, index: i }\"></ng-template></div></div></div><div class=\"pfng-list-expansion list-pf-expansion collapse in\" *ngIf=\"!(config.useHeading && i === 0) && expandTemplate && item.expanded\"><div class=\"list-pf-container\" tabindex=\"0\"><div class=\"list-pf-content\"><div class=\"close\" *ngIf=\"config.hideClose !== true\"><span class=\"pficon pficon-close\" (click)=\"closeExpandArea(item)\"></span></div><ng-template [ngTemplateOutlet]=\"expandTemplate\" [ngOutletContext]=\"{ item: item, index: i }\"></ng-template></div></div></div></div></div><pfng-empty-state *ngIf=\"itemsEmpty\" [config]=\"config.emptyStateConfig\" (onActionSelect)=\"handleAction($event)\"></pfng-empty-state>"
    }),
    __metadata("design:paramtypes", [])
], ListComponent);
export { ListComponent };
//# sourceMappingURL=list.component.js.map