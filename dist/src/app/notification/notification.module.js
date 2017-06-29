"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var notification_event_1 = require("./notification-event");
exports.NotificationEvent = notification_event_1.NotificationEvent;
var notification_type_1 = require("./notification-type");
exports.NotificationType = notification_type_1.NotificationType;
var notification_service_1 = require("./notification.service");
var toast_notification_component_1 = require("./toast-notification.component");
var toast_notification_list_component_1 = require("./toast-notification-list.component");
/**
 * A module containing objects associated with notification components
 */
var NotificationModule = (function () {
    function NotificationModule() {
    }
    return NotificationModule;
}());
NotificationModule = __decorate([
    core_1.NgModule({
        imports: [dropdown_1.BsDropdownModule.forRoot(), common_1.CommonModule],
        declarations: [toast_notification_component_1.ToastNotificationComponent, toast_notification_list_component_1.ToastNotificationListComponent],
        exports: [toast_notification_component_1.ToastNotificationComponent, toast_notification_list_component_1.ToastNotificationListComponent],
        providers: [dropdown_1.BsDropdownConfig, notification_service_1.NotificationService]
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.module.js.map