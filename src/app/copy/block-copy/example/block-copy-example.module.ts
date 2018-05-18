import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationModule } from '../../../notification/notification.module';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { BlockCopyModule } from '../block-copy.module';
import { BlockCopyExampleComponent } from './block-copy-example.component';

@NgModule({
  declarations: [
    BlockCopyExampleComponent
  ],
  imports: [
    CommonModule,
    BlockCopyModule,
    DemoComponentsModule,
    NotificationModule,
    TabsModule.forRoot()
  ],
  providers: [
    TabsetConfig
  ]
})

export class BlockCopyExampleModule {
  constructor() {}
}
