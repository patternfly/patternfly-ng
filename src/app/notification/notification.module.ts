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

export {
  NotificationEvent,
  NotificaitonGroup,
  NotificationType
};

/**
 * A module containing objects associated with notification components
 */
@NgModule({
  imports: [BsDropdownModule.forRoot(), CommonModule, EmptyStateModule],
  declarations: [ToastNotificationComponent, ToastNotificationListComponent, InlineNotificationComponent, 
    NotificationDrawerComponent],
  exports: [ToastNotificationComponent, ToastNotificationListComponent, InlineNotificationComponent, 
    NotificationDrawerComponent],
  providers: [BsDropdownConfig, NotificationService]
})
export class NotificationModule {}
