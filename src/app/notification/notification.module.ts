import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { EmptyStateModule } from '../empty-state/empty-state.module';
import { InlineNotificationComponent } from './inline-notification/inline-notification.component';
import { NotificationDrawerComponent } from './notification-drawer/notification-drawer.component';
import { NotificaitonGroup } from './notification-group';
import { NotificationEvent } from './notification-event';
import { NotificationType } from './notification-type';
import { NotificationService } from './notification-service/notification.service';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';
import { ToastNotificationListComponent } from './toast-notification-list/toast-notification-list.component';

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
 * } from 'patternfly-ng/list';
 */
@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    EmptyStateModule,
    FormsModule
  ],
  declarations: [
    InlineNotificationComponent,
    NotificationDrawerComponent,
    ToastNotificationComponent,
    ToastNotificationListComponent
  ],
  exports: [
    InlineNotificationComponent,
    NotificationDrawerComponent,
    ToastNotificationComponent,
    ToastNotificationListComponent
  ],
  providers: [
    BsDropdownConfig,
    NotificationService
  ]
})
export class NotificationModule {
  constructor() {
    console.log('patternfly-ng: NotificationModule is deprecated; use InlineNotificationModule, ' +
      'NotificationDrawerModule, ToastNotificationModule, or ToastNotificationListModule');
  }
}
