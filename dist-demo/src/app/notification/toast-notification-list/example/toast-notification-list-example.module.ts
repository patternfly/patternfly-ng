import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { ToastNotificationListExampleComponent } from './toast-notification-list-example.component';
import { ToastNotificationListModule } from '../toast-notification-list.module';

@NgModule({
  declarations: [
    ToastNotificationListExampleComponent
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
    TabsetConfig
  ]
})
export class ToastNotificationListExampleModule {
  constructor() {}
}
