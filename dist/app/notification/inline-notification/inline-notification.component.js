import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
/**
 * Inline notifications can be used to provide notifications to user that can persist on the page
 * they are also optionally dismissable by the user
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { InlineNotificationModule } from 'patternfly-ng/notification';
 * // Or
 * import { InlineNotificationModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [InlineNotificationModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { NotificationType } from 'patternfly-ng/notification';
 * </pre></code>
 */
var InlineNotificationComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function InlineNotificationComponent() {
        /**
         * Indicates whether or not the notification is currently hidden
         */
        this.hidden = false;
        /**
         * The event emitted when the mouse hovers over and leaves a notification
         */
        this.hiddenChange = new EventEmitter();
    }
    /**
     * Function called from the view when the notification is removed
     */
    InlineNotificationComponent.prototype.notificationRemove = function () {
        this.hidden = true;
        this.hiddenChange.emit(this.hidden);
    };
    InlineNotificationComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-inline-notification',
                    template: "<div class=\"alert alert-{{type}}\" [ngClass]=\"{'alert-dismissable': dismissable === true}\" *ngIf=\"!hidden\"><button *ngIf=\"dismissable\" (click)=\"notificationRemove()\" type=\"button\" class=\"close\" aria-hidden=\"true\"><span class=\"pficon pficon-close\"></span></button> <span class=\"pficon pficon-ok\" *ngIf=\"type === 'success'\"></span> <span class=\"pficon pficon-info\" *ngIf=\"type === 'info'\"></span> <span class=\"pficon pficon-error-circle-o\" *ngIf=\"type === 'danger'\"></span> <span class=\"pficon pficon-warning-triangle-o\" *ngIf=\"type === 'warning'\"></span> <strong>{{header}}</strong> {{message}}</div>"
                },] },
    ];
    /** @nocollapse */
    InlineNotificationComponent.ctorParameters = function () { return []; };
    InlineNotificationComponent.propDecorators = {
        'type': [{ type: Input },],
        'message': [{ type: Input },],
        'header': [{ type: Input },],
        'dismissable': [{ type: Input },],
        'hidden': [{ type: Input },],
        'hiddenChange': [{ type: Output, args: ['hiddenChange',] },],
    };
    return InlineNotificationComponent;
}());
export { InlineNotificationComponent };
//# sourceMappingURL=inline-notification.component.js.map