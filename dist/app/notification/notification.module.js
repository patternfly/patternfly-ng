var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NotificaitonGroup } from './notification-group';
import { NotificationEvent } from './notification-event';
import { NotificationType } from './notification-type';
import { NotificationService } from './notification-service/notification.service';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';
import { ToastNotificationListComponent } from './toast-notification-list/toast-notification-list.component';
import { InlineNotificationComponent } from './inline-notification/inline-notification.component';
import { NotificationDrawerComponent } from './notification-drawer/notification-drawer.component';
import { EmptyStateModule } from '../empty-state/empty-state.module';
export { NotificationEvent, NotificaitonGroup, NotificationType };
/**
 * A module containing objects associated with notification components
 */
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        NgModule({
            imports: [BsDropdownModule.forRoot(), CommonModule, EmptyStateModule],
            declarations: [ToastNotificationComponent, ToastNotificationListComponent, InlineNotificationComponent,
                NotificationDrawerComponent],
            exports: [ToastNotificationComponent, ToastNotificationListComponent, InlineNotificationComponent,
                NotificationDrawerComponent],
            providers: [BsDropdownConfig, NotificationService]
        })
    ], NotificationModule);
    return NotificationModule;
}());
export { NotificationModule };
//# sourceMappingURL=notification.module.js.map