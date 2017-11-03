import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { NotificationModule } from '../notification.module';
import { NotificationService } from '../notification.service';
import { NotificationServiceExampleComponent } from './notification-service-example.component';
import { ToastNotificationBasicExampleComponent } from './toast-notification-basic-example.component';
import { ToastNotificationExampleComponent } from './toast-notification-example.component';
import { ToastNotificationListExampleComponent } from './toast-notification-list-example.component';
import { InlineNotificationExampleComponent } from './inline-notification-example.component';

@NgModule({
  declarations: [
    InlineNotificationExampleComponent,
    NotificationServiceExampleComponent,
    ToastNotificationBasicExampleComponent,
    ToastNotificationExampleComponent,
    ToastNotificationListExampleComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    NotificationModule,
    TabsModule.forRoot()
  ],
  providers: [
    BsDropdownConfig,
    NotificationService,
    TabsetConfig
  ]
})
export class NotificationExampleModule {
  constructor() {}
}
