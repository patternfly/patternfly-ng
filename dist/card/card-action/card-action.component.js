import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
/**
 * Card action component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { CardActionModule } from 'patternfly-ng/card';
 * // Or
 * import { CardActionModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [CardActionModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CardAction } from 'patternfly-ng/card';
 * </pre></code>
 */
var CardActionComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function CardActionComponent() {
        /**
         * The event emitted when a filter is selected
         */
        this.onActionSelect = new EventEmitter();
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    CardActionComponent.prototype.ngOnInit = function () {
    };
    // Actions
    CardActionComponent.prototype.select = function ($event) {
        this.onActionSelect.emit(this.action);
    };
    CardActionComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-card-action',
                    template: "<div *ngIf=\"action === undefined || action?.disabled; then showDisabled else showEnabled\"></div><ng-template #showDisabled><span class=\"{{action?.iconStyleClass}} card-pf-footer-text\" *ngIf=\"action?.iconStyleClass\" [ngClass]=\"{'card-pf-link-with-icon': action?.iconStyleClass, 'card-pf-link': !action?.iconStyleClass}\"></span> <span class=\"card-pf-footer-text\" *ngIf=\"action?.hypertext\">{{action?.hypertext}}</span></ng-template><ng-template #showEnabled><a href=\"{{action?.url}}\" *ngIf=\"action?.url\" [ngClass]=\"{'card-pf-link-with-icon': action?.iconStyleClass, 'card-pf-link': !action?.iconStyleClass}\"><span class=\"{{action?.iconStyleClass}} card-pf-footer-text\" *ngIf=\"action?.iconStyleClass\"></span> <span class=\"card-pf-footer-text\" *ngIf=\"action?.hypertext\">{{action?.hypertext}}</span> </a><a *ngIf=\"!action?.url\" [ngClass]=\"{'card-pf-link-with-icon': action?.iconStyleClass, 'card-pf-link': !action?.iconStyleClass}\" (click)=\"select($event)\"><span class=\"{{action?.iconStyleClass}} card-pf-footer-text\" *ngIf=\"action?.iconStyleClass\"></span> <span class=\"card-pf-footer-text\" *ngIf=\"action?.hypertext\">{{action?.hypertext}}</span></a></ng-template>"
                },] },
    ];
    /** @nocollapse */
    CardActionComponent.ctorParameters = function () { return []; };
    CardActionComponent.propDecorators = {
        'action': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
    };
    return CardActionComponent;
}());
export { CardActionComponent };
//# sourceMappingURL=card-action.component.js.map