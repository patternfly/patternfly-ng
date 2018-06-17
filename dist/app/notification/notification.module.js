var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { InlineNotificationComponent } from './inline-notification/inline-notification.component';
import { InlineNotificationModule } from './inline-notification/inline-notification.module';
import { NotificationDrawerComponent } from './notification-drawer/notification-drawer.component';
import { NotificationDrawerModule } from './notification-drawer/notification-drawer.module';
import { NotificaitonGroup } from './notification-group';
import { NotificationEvent } from './notification-event';
import { NotificationType } from './notification-type';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';
import { ToastNotificationModule } from './toast-notification/toast-notification.module';
import { ToastNotificationListComponent } from './toast-notification-list/toast-notification-list.component';
import { ToastNotificationListModule } from './toast-notification-list/toast-notification-list.module';
export { NotificationEvent, NotificaitonGroup, NotificationType };
/**
 * A module containing objects associated with notification components
 *
 * @deprecated Use individual module imports
 *
 * import {
 *   InlineNotificationModule,
 *   NotificationDrawerModule,
 *   ToastNotificationModule,
 *   ToastNotificationListModule
 * } from 'patternfly-ng/notification';
 */
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
        console.log('patternfly-ng: NotificationModule is deprecated; use InlineNotificationModule, ' +
            'NotificationDrawerModule, ToastNotificationModule, or ToastNotificationListModule');
    }
    NotificationModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                InlineNotificationModule,
                NotificationDrawerModule,
                ToastNotificationModule,
                ToastNotificationListModule
            ],
            exports: [
                InlineNotificationComponent,
                NotificationDrawerComponent,
                ToastNotificationComponent,
                ToastNotificationListComponent
            ]
        }),
        __metadata("design:paramtypes", [])
    ], NotificationModule);
    return NotificationModule;
}());
export { NotificationModule };
//# sourceMappingURL=notification.module.js.map