var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Action } from '../action/action';
import { Notification } from './notification';
/**
 * Toast notifications are used to notify users of a system occurrence. Toast notifications should be transient and stay
 * on the screen for 8 seconds, so that they do not block the information behind them for too long, but allows the user
 * to read the message. The ToastNotification component allows status, header, message, primary action and menu actions
 * for the notification. The notification can also allow the user to close the notification.
 *
 * Note: Using the kebab menu (more actions) with the close button is not currently supported. If both are specified the
 * close button will not be shown. Add a close menu item if you want to have both capabilities.
 */
var ToastNotificationComponent = (function () {
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
     *  Setup component configuration upon initialization
     */
    ToastNotificationComponent.prototype.ngOnInit = function () {
    };
    /**
     *  Check if the component config has changed
     */
    ToastNotificationComponent.prototype.ngDoCheck = function () {
        this._showCloseButton = (this.showClose === true)
            && (this.moreActions === undefined || this.moreActions.length === 0);
    };
    Object.defineProperty(ToastNotificationComponent.prototype, "showCloseButton", {
        // Getters & setters
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
    return ToastNotificationComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], ToastNotificationComponent.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ToastNotificationComponent.prototype, "message", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], ToastNotificationComponent.prototype, "moreActions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Notification)
], ToastNotificationComponent.prototype, "notification", void 0);
__decorate([
    Input(),
    __metadata("design:type", Action)
], ToastNotificationComponent.prototype, "primaryAction", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ToastNotificationComponent.prototype, "showClose", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ToastNotificationComponent.prototype, "type", void 0);
__decorate([
    Output('onActionSelect'),
    __metadata("design:type", Object)
], ToastNotificationComponent.prototype, "onActionSelect", void 0);
__decorate([
    Output('onCloseSelect'),
    __metadata("design:type", Object)
], ToastNotificationComponent.prototype, "onCloseSelect", void 0);
__decorate([
    Output('onViewingChange'),
    __metadata("design:type", Object)
], ToastNotificationComponent.prototype, "onViewingChange", void 0);
ToastNotificationComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-toast-notification',
        styles: [".toast-pf .dropdown-menu>li>a,.toast-pf-action>a{cursor:pointer}"],
        template: "<div class=\"toast-pf alert alert-{{type}}\" [ngClass]=\"{'alert-dismissable': showCloseButton}\" (mouseenter)=\"handleEnter($event)\" (mouseleave)=\"handleLeave($event)\"><div *ngIf=\"moreActions?.length > 0\" class=\"pull-right dropdown-kebab-pf\" dropdown><button class=\"btn btn-link dropdown-toggle\" type=\"button\" id=\"dropdownKebabRight\" dropdownToggle><span class=\"fa fa-ellipsis-v\"></span></button><ul class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"dropdownKebabRight\" *dropdownMenu><li *ngFor=\"let action of moreActions\" class=\"{{action.styleClass}}\" [attr.role]=\"action.separator === true ? 'separator' : 'menuitem'\" [ngClass]=\"{'divider': action.separator === true, 'disabled': action.disabled === true, 'hidden': action.visible === false}\"><a *ngIf=\"action.disabled !== true && action.separator !== true\" class=\"dropdown-item secondary-action\" href=\"javascript:void(0)\" title=\"{{action.tooltip}}\" (click)=\"handleAction(action)\">{{action.title}}</a> <a *ngIf=\"action.disabled === true && action.separator !== true\" class=\"dropdown-item secondary-action\" href=\"javascript:void(0)\" title=\"{{action.tooltip}}\" onclick=\"return false;\">{{action.title}}</a></li></ul></div><button *ngIf=\"showCloseButton\" type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"handleClose($event)\"><span class=\"pficon pficon-close\"></span></button><div *ngIf=\"primaryAction\" class=\"pull-right toast-pf-action {{primaryAction.styleClass}}\" [ngClass]=\"{'padding-right-15': showCloseButton == true, 'hidden': primaryAction?.visible === false}\"><div *ngIf=\"primaryAction.template; then showButtonTemplate else showButton\"></div><ng-template #showButtonTemplate let-action=\"action\" [ngTemplateOutlet]=\"primaryAction.template\" [ngOutletContext]=\"{ action: action }\"></ng-template><ng-template #showButton><a *ngIf=\"primaryAction.disabled !== true\" href=\"javascript:void(0)\" title=\"{{primaryAction?.tooltip}}\" (click)=\"handleAction(primaryAction)\">{{primaryAction?.title}}</a> <a *ngIf=\"primaryAction.disabled === true\" href=\"javascript:void(0)\" title=\"{{primaryAction?.tooltip}}\" onclick=\"return false;\">{{primaryAction?.title}}</a></ng-template></div><span class=\"pficon pficon-ok\" *ngIf=\"type === 'success'\"></span> <span class=\"pficon pficon-info\" *ngIf=\"type === 'info'\"></span> <span class=\"pficon pficon-error-circle-o\" *ngIf=\"type === 'danger'\"></span> <span class=\"pficon pficon-warning-triangle-o\" *ngIf=\"type === 'warning'\"></span> <span *ngIf=\"header\"><strong>{{header}}</strong> {{message}} </span><span *ngIf=\"!header\">{{message}}</span></div>"
    }),
    __metadata("design:paramtypes", [])
], ToastNotificationComponent);
export { ToastNotificationComponent };
//# sourceMappingURL=toast-notification.component.js.map