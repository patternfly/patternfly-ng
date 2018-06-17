import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { Notification } from '../notification';
import { NotificationEvent } from '../notification-event';
import { ToastNotificationListComponent } from './toast-notification-list.component';
import { ToastNotificationModule } from '../toast-notification';

export {
  Notification,
  NotificationEvent
};

/**
 * A module containing objects associated with toast notification lists
 */
@NgModule({
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
export class ToastNotificationListModule {}
