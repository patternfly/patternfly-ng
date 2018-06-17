import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { NotificationService } from '../notification.service';
import { NotificationServiceExampleComponent } from './notification-service-example.component';
import { NotificationServiceBasicExampleComponent } from './notification-service-basic-example.component';
import { NotificationServiceObserverExampleComponent } from './notification-service-observer-example.component';
import { ToastNotificationListModule } from '../../toast-notification-list';

@NgModule({
  declarations: [
    NotificationServiceExampleComponent,
    NotificationServiceBasicExampleComponent,
    NotificationServiceObserverExampleComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    TabsModule.forRoot(),
    ToastNotificationListModule
  ],
  providers: [
    BsDropdownConfig,
    NotificationService,
    TabsetConfig
  ]
})
export class NotificationServiceExampleModule {
  constructor() {}
}
