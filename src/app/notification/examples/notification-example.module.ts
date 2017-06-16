import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { NotificationModule } from '../notification.module';
import { NotificationService } from '../notification.service';
import { NotificationExampleService } from './notification-example.service';
import { ToastNotificationBasicExampleComponent } from './toast-notification-basic-example.component';
import { ToastNotificationExampleComponent } from './toast-notification-example.component';
import { ToastNotificationListExampleComponent } from './toast-notification-list-example.component';

@NgModule({
  declarations: [
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
    TabsetConfig,
  {
    provide: NotificationService,
    useClass: NotificationExampleService
  }]
})
export class NotificationExampleModule {
  constructor() {}
}
