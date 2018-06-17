import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { ToastNotificationExampleComponent } from './toast-notification-example.component';
import { ToastNotificationModule } from '../toast-notification.module';

@NgModule({
  declarations: [
    ToastNotificationExampleComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    TabsModule.forRoot(),
    ToastNotificationModule
  ],
  providers: [
    BsDropdownConfig,
    TabsetConfig
  ]
})
export class ToastNotificationExampleModule {
  constructor() {}
}
