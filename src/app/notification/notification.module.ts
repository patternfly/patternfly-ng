import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NotificationEvent } from './notification-event';
import { NotificationType } from './notification-type';
import { NotificationService } from './notification.service';
import { ToastNotificationComponent } from './toast-notification.component';
import { ToastNotificationListComponent } from './toast-notification-list.component';

export {
  NotificationEvent,
  NotificationType
}

@NgModule({
  imports: [ BsDropdownModule.forRoot(), CommonModule ],
  declarations: [ ToastNotificationComponent, ToastNotificationListComponent ],
  exports: [ ToastNotificationComponent, ToastNotificationListComponent ],
  providers: [ BsDropdownConfig, NotificationService ]
})
export class NotificationModule { }
