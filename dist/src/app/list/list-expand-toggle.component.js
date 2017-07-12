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
/**
 * List compund expansion toggle component.
 *
 * This is intended to be used with the list component's itemExpandTemplate
 */
var ListExpandToggleComponent = (function () {
    /**
     * The default constructor
     */
    function ListExpandToggleComponent() {
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    ListExpandToggleComponent.prototype.ngOnInit = function () {
        if (this.item === undefined) {
            throw new Error('ListCompoundToggleComponent: item attribute not set');
        }
        if (this.expandId === undefined) {
            throw new Error('ListCompoundToggleComponent: expandId attribute not set');
        }
    };
    Object.defineProperty(ListExpandToggleComponent.prototype, "isExpanded", {
        // Actions
        /**
         * Test if item is expanded based on given expand item ID
         *
         * @returns {boolean} True if item is expanded
         */
        get: function () {
            return (this.item.expanded === true && this.item.expandId === this.expandId);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle expand item open/close
     */
    ListExpandToggleComponent.prototype.toggleExpand = function () {
        // Item may already be open
        if (this.item.expanded && this.item.expandId !== this.expandId) {
            this.item.expandId = this.expandId;
            return;
        }
        this.item.expandId = this.expandId;
        this.item.expanded = !this.item.expanded;
    };
    return ListExpandToggleComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], ListExpandToggleComponent.prototype, "expandId", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListExpandToggleComponent.prototype, "item", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ListExpandToggleComponent.prototype, "template", void 0);
ListExpandToggleComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-list-expand-toggle',
        template: "<div class=\"list-pf-chevron\" (click)=\"toggleExpand()\"><span class=\"fa fa-angle-right\" [ngClass]=\"{'fa-angle-down': isExpanded}\"></span><ng-template *ngIf=\"template\" let-item=\"item\" [ngTemplateOutlet]=\"template\" [ngOutletContext]=\"{ item: item }\"></ng-template></div>"
    }),
    __metadata("design:paramtypes", [])
], ListExpandToggleComponent);
export { ListExpandToggleComponent };
//# sourceMappingURL=list-expand-toggle.component.js.map