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
    // Actions
    /**
     * Test if item is expanded based on given expand item ID
     *
     * @returns {boolean} True if item is expanded
     */
    ListExpandToggleComponent.prototype.isItemExpanded = function () {
        return (this.item.isItemExpanded === true && this.item.expandId === this.expandId);
    };
    /**
     * Toggle expand item open/close
     */
    ListExpandToggleComponent.prototype.toggleExpand = function () {
        // Item may already be open
        if (this.item.isItemExpanded && this.item.expandId !== this.expandId) {
            this.item.expandId = this.expandId;
            return;
        }
        this.item.expandId = this.expandId;
        this.item.isItemExpanded = !this.item.isItemExpanded;
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
        template: require('./list-expand-toggle.component.html')
    }),
    __metadata("design:paramtypes", [])
], ListExpandToggleComponent);
export { ListExpandToggleComponent };
//# sourceMappingURL=list-expand-toggle.component.js.map