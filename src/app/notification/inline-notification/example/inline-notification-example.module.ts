import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { InlineNotificationExampleComponent } from './inline-notification-example.component';
import { InlineNotificationModule } from '../inline-notification.module';

@NgModule({
  declarations: [
    InlineNotificationExampleComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    InlineNotificationModule,
    TabsModule.forRoot()
  ],
  providers: [
    BsDropdownConfig,
    TabsetConfig
  ]
})
export class InlineNotificationExampleModule {
  constructor() {}
}
