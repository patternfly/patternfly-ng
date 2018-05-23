import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationModule } from '../../../notification/notification.module';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { InlineCopyModule } from '../inline-copy.module';
import { InlineCopyExampleComponent } from './inline-copy-example.component';
import { InlineCopyA11yExampleComponent } from './inline-copy-a11y-example.component';
import { InlineCopyWrapExampleComponent } from './inline-copy-wrap-example.component';
import { InlineCopyBasicExampleComponent } from './inline-copy-basic-example.component';

@NgModule({
  declarations: [
    InlineCopyExampleComponent,
    InlineCopyA11yExampleComponent,
    InlineCopyWrapExampleComponent,
    InlineCopyBasicExampleComponent
  ],
  imports: [
    CommonModule,
    InlineCopyModule,
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
