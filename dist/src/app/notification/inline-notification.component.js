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
import { NotificationType } from './notification-type';
/**
 * Inline notifications can be used to provide notifications to user that can persist on the page
 * they are also optionally dismissable by the user
 */
var InlineNotificationComponent = (function () {
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
    return InlineNotificationComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", NotificationType)
], InlineNotificationComponent.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], InlineNotificationComponent.prototype, "message", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], InlineNotificationComponent.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], InlineNotificationComponent.prototype, "dismissable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], InlineNotificationComponent.prototype, "hidden", void 0);
__decorate([
    Output('hiddenChange'),
    __metadata("design:type", Object)
], InlineNotificationComponent.prototype, "hiddenChange", void 0);
InlineNotificationComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-inline-notification',
        styleUrls: [],
        template: "<div class=\"alert alert-{{type}}\" ng-class=\"{'alert-dismissable': dismissable === true}\" *ngIf=\"!hidden\"><button *ngIf=\"dismissable\" (click)=\"notificationRemove()\" type=\"button\" class=\"close\" aria-hidden=\"true\"><span class=\"pficon pficon-close\"></span></button> <span class=\"pficon pficon-ok\" *ngIf=\"type === 'success'\"></span> <span class=\"pficon pficon-info\" *ngIf=\"type === 'info'\"></span> <span class=\"pficon pficon-error-circle-o\" *ngIf=\"type === 'danger'\"></span> <span class=\"pficon pficon-warning-triangle-o\" *ngIf=\"type === 'warning'\"></span> <strong>{{header}}</strong> {{message}}</div>"
    }),
    __metadata("design:paramtypes", [])
], InlineNotificationComponent);
export { InlineNotificationComponent };
//# sourceMappingURL=inline-notification.component.js.map