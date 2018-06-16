import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { InlineNotificationComponent } from './inline-notification.component';
import { NotificationType } from '../notification-type';

export {
  NotificationType
};

/**
 * A module containing objects associated with inline notifications
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InlineNotificationComponent
  ],
  exports: [
    InlineNotificationComponent
  ]
})
export class InlineNotificationModule {}
