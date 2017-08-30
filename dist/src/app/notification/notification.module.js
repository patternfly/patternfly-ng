var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NotificationEvent } from './notification-event';
import { NotificationType } from './notification-type';
import { NotificationService } from './notification.service';
import { ToastNotificationComponent } from './toast-notification.component';
import { ToastNotificationListComponent } from './toast-notification-list.component';
export { NotificationEvent, NotificationType };
/**
 * A module containing objects associated with notification components
 */
var NotificationModule = (function () {
    function NotificationModule() {
    }
    return NotificationModule;
}());
NotificationModule = __decorate([
    NgModule({
        imports: [BsDropdownModule.forRoot(), CommonModule],
        declarations: [ToastNotificationComponent, ToastNotificationListComponent],
        exports: [ToastNotificationComponent, ToastNotificationListComponent],
        providers: [BsDropdownConfig, NotificationService]
    })
], NotificationModule);
export { NotificationModule };
//# sourceMappingURL=notification.module.js.map