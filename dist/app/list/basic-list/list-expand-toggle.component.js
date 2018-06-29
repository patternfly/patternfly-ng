import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * Helper component for the list compund expansion toggle.
 */
var ListExpandToggleComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ListExpandToggleComponent() {
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
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
    ListExpandToggleComponent.prototype.toggleExpandItem = function () {
        // Item may already be open
        if (this.item.expanded && this.item.expandId !== this.expandId) {
            this.item.expandId = this.expandId;
            return;
        }
        this.item.expandId = this.expandId;
        this.item.expanded = !this.item.expanded;
    };
    ListExpandToggleComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-list-expand-toggle',
                    template: "<div class=\"list-pf-chevron\" (click)=\"toggleExpandItem()\"><span class=\"fa fa-fw fa-angle-right\" [ngClass]=\"{'fa-angle-down': isExpanded}\"></span><ng-template *ngIf=\"template\" let-item=\"item\" [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ item: item }\"></ng-template></div>"
                },] },
    ];
    /** @nocollapse */
    ListExpandToggleComponent.ctorParameters = function () { return []; };
    ListExpandToggleComponent.propDecorators = {
        'expandId': [{ type: Input },],
        'item': [{ type: Input },],
        'template': [{ type: Input },],
    };
    return ListExpandToggleComponent;
}());
export { ListExpandToggleComponent };
//# sourceMappingURL=list-expand-toggle.component.js.map