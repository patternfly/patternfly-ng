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
/**
 * List view component.
 */
var ListViewCompoundToggleComponent = (function () {
    function ListViewCompoundToggleComponent() {
    }
    // Initialization
    ListViewCompoundToggleComponent.prototype.ngOnInit = function () {
        if (this.item === undefined) {
            throw new Error('ListViewCompoundToggleComponent: item attribute not set');
        }
        if (this.expandingRowId === undefined) {
            throw new Error('ListViewCompoundToggleComponent: expandingRowId attribute not set');
        }
    };
    // Actions
    /**
     * Test if row is expanded based on given expanding row ID
     *
     * @returns {boolean} True if row is expanded
     */
    ListViewCompoundToggleComponent.prototype.isRowExpanded = function () {
        return (this.item.isRowExpanded === true && this.item.expandingRowId === this.expandingRowId);
    };
    /**
     * Toggle expanding row open/close
     */
    ListViewCompoundToggleComponent.prototype.toggleExpandingRow = function () {
        // Row may already be open
        if (this.item.isRowExpanded && this.item.expandingRowId !== this.expandingRowId) {
            this.item.expandingRowId = this.expandingRowId;
            return;
        }
        this.item.expandingRowId = this.expandingRowId;
        this.item.isRowExpanded = !this.item.isRowExpanded;
    };
    return ListViewCompoundToggleComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListViewCompoundToggleComponent.prototype, "expandingRowId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListViewCompoundToggleComponent.prototype, "item", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], ListViewCompoundToggleComponent.prototype, "template", void 0);
ListViewCompoundToggleComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'pfng-list-view-compound-toggle',
        template: require('./list-view-compound-toggle.component.html')
    }),
    __metadata("design:paramtypes", [])
], ListViewCompoundToggleComponent);
exports.ListViewCompoundToggleComponent = ListViewCompoundToggleComponent;
//# sourceMappingURL=list-view-compound-toggle.component.js.map