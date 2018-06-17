import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { Notification } from '../notification';
import { NotificationEvent } from '../notification-event';
import { ToastNotificationComponent } from './toast-notification.component';

export {
  Notification,
  NotificationEvent
};

/**
 * A module containing objects associated with toast notifications
 */
@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  declarations: [
    ToastNotificationComponent
  ],
  exports: [
    ToastNotificationComponent
  ],
  providers: [
    BsDropdownConfig
  ]
})
export class ToastNotificationModule {}
