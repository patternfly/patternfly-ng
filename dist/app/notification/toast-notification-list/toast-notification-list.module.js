var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Notification } from '../notification';
import { NotificationEvent } from '../notification-event';
import { ToastNotificationListComponent } from './toast-notification-list.component';
import { ToastNotificationModule } from '../toast-notification';
export { Notification, NotificationEvent };
/**
 * A module containing objects associated with toast notification lists
 */
var ToastNotificationListModule = /** @class */ (function () {
    function ToastNotificationListModule() {
    }
    ToastNotificationListModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ToastNotificationModule
            ],
            declarations: [
                ToastNotificationListComponent
            ],
            exports: [
                ToastNotificationListComponent
            ]
        })
    ], ToastNotificationListModule);
    return ToastNotificationListModule;
}());
export { ToastNotificationListModule };
//# sourceMappingURL=toast-notification-list.module.js.map