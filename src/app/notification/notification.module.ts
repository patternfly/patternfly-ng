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

export {
  NotificationEvent,
  NotificaitonGroup,
  NotificationType
};

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
@NgModule({
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
})
export class NotificationModule {
  constructor() {
    console.log('patternfly-ng: NotificationModule is deprecated; use InlineNotificationModule, ' +
      'NotificationDrawerModule, ToastNotificationModule, or ToastNotificationListModule');
  }
}
