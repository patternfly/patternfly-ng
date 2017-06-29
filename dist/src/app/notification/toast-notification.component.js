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
var action_1 = require("../models/action");
var notification_1 = require("./notification");
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
        this.onActionSelect = new core_1.EventEmitter();
        /**
         * The event emitted when the close button has been selected
         */
        this.onCloseSelect = new core_1.EventEmitter();
        /**
         * The event emitted when the mouse hovers over and leaves a notification
         */
        this.onViewingChange = new core_1.EventEmitter();
        this.showCloseButton = false;
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
        this.showCloseButton = (this.showClose === true)
            && (this.moreActions === undefined || this.moreActions.length === 0);
    };
    // Actions
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
    return ToastNotificationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToastNotificationComponent.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToastNotificationComponent.prototype, "message", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ToastNotificationComponent.prototype, "moreActions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", notification_1.Notification)
], ToastNotificationComponent.prototype, "notification", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", action_1.Action)
], ToastNotificationComponent.prototype, "primaryAction", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ToastNotificationComponent.prototype, "showClose", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToastNotificationComponent.prototype, "type", void 0);
__decorate([
    core_1.Output('onActionSelect'),
    __metadata("design:type", Object)
], ToastNotificationComponent.prototype, "onActionSelect", void 0);
__decorate([
    core_1.Output('onCloseSelect'),
    __metadata("design:type", Object)
], ToastNotificationComponent.prototype, "onCloseSelect", void 0);
__decorate([
    core_1.Output('onViewingChange'),
    __metadata("design:type", Object)
], ToastNotificationComponent.prototype, "onViewingChange", void 0);
ToastNotificationComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'pfng-toast-notification',
        styles: [require('./toast-notification.component.css').toString()],
        template: require('./toast-notification.component.html')
    }),
    __metadata("design:paramtypes", [])
], ToastNotificationComponent);
exports.ToastNotificationComponent = ToastNotificationComponent;
//# sourceMappingURL=toast-notification.component.js.map