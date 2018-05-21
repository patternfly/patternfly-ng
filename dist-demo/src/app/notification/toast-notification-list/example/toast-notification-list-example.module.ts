import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { NotificationModule } from '../../notification.module';
import { ToastNotificationListExampleComponent } from './toast-notification-list-example.component';

@NgModule({
  declarations: [
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
    TabsetConfig
  ]
})
export class ToastNotificationListExampleModule {
  constructor() {}
}
