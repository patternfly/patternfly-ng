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
 */
var ListCompoundToggleComponent = (function () {
    /**
     * The default constructor
     */
    function ListCompoundToggleComponent() {
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    ListCompoundToggleComponent.prototype.ngOnInit = function () {
        if (this.item === undefined) {
            throw new Error('ListCompoundToggleComponent: item attribute not set');
        }
        if (this.expandingRowId === undefined) {
            throw new Error('ListCompoundToggleComponent: expandingRowId attribute not set');
        }
    };
    // Actions
    /**
     * Test if row is expanded based on given expanding row ID
     *
     * @returns {boolean} True if row is expanded
     */
    ListCompoundToggleComponent.prototype.isRowExpanded = function () {
        return (this.item.isRowExpanded === true && this.item.expandingRowId === this.expandingRowId);
    };
    /**
     * Toggle expanding row open/close
     */
    ListCompoundToggleComponent.prototype.toggleExpandingRow = function () {
        // Row may already be open
        if (this.item.isRowExpanded && this.item.expandingRowId !== this.expandingRowId) {
            this.item.expandingRowId = this.expandingRowId;
            return;
        }
        this.item.expandingRowId = this.expandingRowId;
        this.item.isRowExpanded = !this.item.isRowExpanded;
    };
    return ListCompoundToggleComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], ListCompoundToggleComponent.prototype, "expandingRowId", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListCompoundToggleComponent.prototype, "item", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ListCompoundToggleComponent.prototype, "template", void 0);
ListCompoundToggleComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-list-compound-toggle',
        template: require('./list-compound-toggle.component.html')
    }),
    __metadata("design:paramtypes", [])
], ListCompoundToggleComponent);
export { ListCompoundToggleComponent };
//# sourceMappingURL=list-compound-toggle.component.js.map