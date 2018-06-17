import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { NotificationDrawerComponent } from './notification-drawer.component';

/**
 * A module containing objects associated with the notification drawer
 */
@NgModule({
  imports: [
    CommonModule,
    EmptyStateModule,
    FormsModule
  ],
  declarations: [
    NotificationDrawerComponent
  ],
  exports: [
    NotificationDrawerComponent
  ]
})
export class NotificationDrawerModule {}
