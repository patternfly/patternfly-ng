import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationModule } from '../../../notification/notification.module';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { CopyModule } from '../../copy.module';
import { InlineCopyExampleComponent } from './inline-copy-example.component';

@NgModule({
  declarations: [
    InlineCopyExampleComponent
  ],
  imports: [
    CommonModule,
    CopyModule,
    DemoComponentsModule,
    NotificationModule,
    TabsModule.forRoot()
  ],
  providers: [
    TabsetConfig
  ]
})

export class InlineCopyExampleModule {
  constructor() {}
}
