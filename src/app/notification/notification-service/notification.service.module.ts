import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { Notification } from '../notification';
import { NotificationType } from '../notification-type';
import { NotificationService } from './notification.service';

export {
  Notification,
  NotificationType
};

/**
 * A module containing objects associated with the notification service
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationServiceModule {}
