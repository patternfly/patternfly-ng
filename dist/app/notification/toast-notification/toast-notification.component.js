import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
/**
 * Toast notifications are used to notify users of a system occurrence. Toast notifications should be transient and stay
 * on the screen for 8 seconds, so that they do not block the information behind them for too long, but allows the user
 * to read the message. The ToastNotification component allows status, header, message, primary action and menu actions
 * for the notification. The notification can also allow the user to close the notification.
 *
 * Note: Using the kebab menu (more actions) with the close button is not currently supported. If both are specified the
 * close button will not be shown. Add a close menu item if you want to have both capabilities.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ToastNotificationModule } from 'patternfly-ng/notification';
 * // Or
 * import { ToastNotificationModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [ToastNotificationModule, BsDropdownModule.forRoot(),...],
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
var ToastNotificationComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ToastNotificationComponent() {
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
        this._showCloseButton = false;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    ToastNotificationComponent.prototype.ngOnInit = function () {
    };
    /**
     * Check if the component config has changed
     */
    ToastNotificationComponent.prototype.ngDoCheck = function () {
        this._showCloseButton = (this.showClose === true)
            && (this.moreActions === undefined || this.moreActions === null || this.moreActions.length === 0);
    };
    Object.defineProperty(ToastNotificationComponent.prototype, "showCloseButton", {
        // Accessors
        /**
         * Get the flag indicating that the close button should be shown
         *
         * @returns {FilterField} The flag indicating that the close button should be shown
         */
        get: function () {
            return this._showCloseButton;
        },
        enumerable: true,
        configurable: true
    });
    // Actions
    ToastNotificationComponent.prototype.handleEnter = function ($event) {
        this.onViewingChange.emit({
            notification: this.notification,
            isViewing: true
        });
    };
    ToastNotificationComponent.prototype.handleLeave = function ($event) {
        this.onViewingChange.emit({
            notification: this.notification,
            isViewing: false
        });
    };
    // Private
    ToastNotificationComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit({
                action: action,
                notification: this.notification
            });
        }
    };
    ToastNotificationComponent.prototype.handleClose = function ($event) {
        this.onCloseSelect.emit({ notification: this.notification });
    };
    ToastNotificationComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-toast-notification',
                    template: "<div class=\"toast-pf alert alert-{{type}}\" [ngClass]=\"{'alert-dismissable': showCloseButton}\" (mouseenter)=\"handleEnter($event)\" (mouseleave)=\"handleLeave($event)\"><div *ngIf=\"moreActions?.length > 0\" class=\"pull-right dropdown-kebab-pf\" dropdown><button class=\"btn btn-link dropdown-toggle\" type=\"button\" id=\"dropdownKebabRight\" dropdownToggle><span class=\"fa fa-ellipsis-v\"></span></button><ul class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"dropdownKebabRight\" *dropdownMenu><li *ngFor=\"let action of moreActions\" class=\"{{action.styleClass}}\" [attr.role]=\"action.separator === true ? 'separator' : 'menuitem'\" [ngClass]=\"{'divider': action.separator === true, 'disabled': action.disabled === true, 'hidden': action.visible === false}\"><a *ngIf=\"action.disabled !== true && action.separator !== true\" class=\"dropdown-item secondary-action\" href=\"javascript:void(0)\" title=\"{{action.tooltip}}\" (click)=\"handleAction(action)\">{{action.title}}</a> <a *ngIf=\"action.disabled === true && action.separator !== true\" class=\"dropdown-item secondary-action\" href=\"javascript:void(0)\" title=\"{{action.tooltip}}\" onclick=\"return false;\">{{action.title}}</a></li></ul></div><button *ngIf=\"showCloseButton\" type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"handleClose($event)\"><span class=\"pficon pficon-close\"></span></button><div *ngIf=\"primaryAction\" class=\"pull-right toast-pf-action {{primaryAction.styleClass}}\" [ngClass]=\"{'padding-right-15': showCloseButton == true, 'hidden': primaryAction?.visible === false}\"><div *ngIf=\"primaryAction.template; then showButtonTemplate else showButton\"></div><ng-template #showButtonTemplate let-action=\"action\" [ngTemplateOutlet]=\"primaryAction.template\" [ngTemplateOutletContext]=\"{ action: action }\"></ng-template><ng-template #showButton><a *ngIf=\"primaryAction.disabled !== true\" href=\"javascript:void(0)\" title=\"{{primaryAction?.tooltip}}\" (click)=\"handleAction(primaryAction)\">{{primaryAction?.title}}</a> <a *ngIf=\"primaryAction.disabled === true\" href=\"javascript:void(0)\" title=\"{{primaryAction?.tooltip}}\" onclick=\"return false;\">{{primaryAction?.title}}</a></ng-template></div><span class=\"pficon pficon-ok\" *ngIf=\"type === 'success'\"></span> <span class=\"pficon pficon-info\" *ngIf=\"type === 'info'\"></span> <span class=\"pficon pficon-error-circle-o\" *ngIf=\"type === 'danger'\"></span> <span class=\"pficon pficon-warning-triangle-o\" *ngIf=\"type === 'warning'\"></span> <span *ngIf=\"header\"><strong>{{header}}</strong> {{message}} </span><span *ngIf=\"!header\">{{message}}</span></div>"
                },] },
    ];
    /** @nocollapse */
    ToastNotificationComponent.ctorParameters = function () { return []; };
    ToastNotificationComponent.propDecorators = {
        'header': [{ type: Input },],
        'message': [{ type: Input },],
        'moreActions': [{ type: Input },],
        'notification': [{ type: Input },],
        'primaryAction': [{ type: Input },],
        'showClose': [{ type: Input },],
        'type': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
        'onCloseSelect': [{ type: Output, args: ['onCloseSelect',] },],
        'onViewingChange': [{ type: Output, args: ['onViewingChange',] },],
    };
    return ToastNotificationComponent;
}());
export { ToastNotificationComponent };
//# sourceMappingURL=toast-notification.component.js.map