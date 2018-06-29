import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
/**
 * Component to display a list of toast notifications
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ToastNotificationListModule } from 'patternfly-ng/notification';
 * // Or
 * import { ToastNotificationListModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [ToastNotificationListModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Notification, NotificationEvent, NotificationType } from 'patternfly-ng/notification';
 * </pre></code>
 */
var ToastNotificationListComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ToastNotificationListComponent() {
        /**
         * The event emitted when an action has been selected
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when the close button has been selected
         */
        this.onCloseSelect = new EventEmitter();
        /**
         * The event emitted when the mouse hovers over and leaves a notification
         */
        this.onViewingChange = new EventEmitter();
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    ToastNotificationListComponent.prototype.ngOnInit = function () {
    };
    // Actions
    /**
     * Check if the component config has changed
     */
    ToastNotificationListComponent.prototype.handleAction = function ($event) {
        this.onActionSelect.emit($event);
    };
    ToastNotificationListComponent.prototype.handleClose = function ($event) {
        this.onCloseSelect.emit($event);
    };
    ToastNotificationListComponent.prototype.handleViewingChange = function ($event) {
        this.onViewingChange.emit($event);
    };
    ToastNotificationListComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-toast-notification-list',
                    template: "<div class=\"toast-notifications-list-pf\" *ngIf=\"notifications?.length > 0\"><div *ngFor=\"let notification of notifications\"><pfng-toast-notification [header]=\"notification.header\" [message]=\"notification.message\" [notification]=\"notification\" [moreActions]=\"notification.moreActions\" [primaryAction]=\"notification.primaryAction\" [showClose]=\"showClose === true || notification.isPersistent === true\" [type]=\"notification.type\" (onActionSelect)=\"handleAction($event)\" (onCloseSelect)=\"handleClose($event)\" (onViewingChange)=\"handleViewingChange($event)\"></pfng-toast-notification></div></div>"
                },] },
    ];
    /** @nocollapse */
    ToastNotificationListComponent.ctorParameters = function () { return []; };
    ToastNotificationListComponent.propDecorators = {
        'notifications': [{ type: Input },],
        'showClose': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
        'onCloseSelect': [{ type: Output, args: ['onCloseSelect',] },],
        'onViewingChange': [{ type: Output, args: ['onViewingChange',] },],
    };
    return ToastNotificationListComponent;
}());
export { ToastNotificationListComponent };
//# sourceMappingURL=toast-notification-list.component.js.map