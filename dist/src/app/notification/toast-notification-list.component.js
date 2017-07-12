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
/**
 * Component to display a list of toast notifications
 */
var ToastNotificationListComponent = (function () {
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
     *  Setup component configuration upon initialization
     */
    ToastNotificationListComponent.prototype.ngOnInit = function () {
    };
    // Actions
    /**
     *  Check if the component config has changed
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
    return ToastNotificationListComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], ToastNotificationListComponent.prototype, "notifications", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ToastNotificationListComponent.prototype, "showClose", void 0);
__decorate([
    Output('onActionSelect'),
    __metadata("design:type", Object)
], ToastNotificationListComponent.prototype, "onActionSelect", void 0);
__decorate([
    Output('onCloseSelect'),
    __metadata("design:type", Object)
], ToastNotificationListComponent.prototype, "onCloseSelect", void 0);
__decorate([
    Output('onViewingChange'),
    __metadata("design:type", Object)
], ToastNotificationListComponent.prototype, "onViewingChange", void 0);
ToastNotificationListComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-toast-notification-list',
        styles: [""],
        template: "<div class=\"toast-notifications-list-pf\" *ngIf=\"notifications?.length > 0\"><div *ngFor=\"let notification of notifications\"><pfng-toast-notification [header]=\"notification.header\" [message]=\"notification.message\" [notification]=\"notification\" [moreActions]=\"notification.moreActions\" [primaryAction]=\"notification.primaryAction\" [showClose]=\"showClose === true || notification.isPersistent === true\" [type]=\"notification.type\" (onActionSelect)=\"handleAction($event)\" (onCloseSelect)=\"handleClose($event)\" (onViewingChange)=\"handleViewingChange($event)\"></pfng-toast-notification></div></div>"
    }),
    __metadata("design:paramtypes", [])
], ToastNotificationListComponent);
export { ToastNotificationListComponent };
//# sourceMappingURL=toast-notification-list.component.js.map