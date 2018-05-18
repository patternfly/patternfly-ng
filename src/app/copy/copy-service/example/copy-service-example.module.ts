import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { NotificationModule } from '../../../notification/notification.module';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { CopyServiceModule } from '../copy.service.module';
import { CopyService } from '../copy.service';
import { CopyServiceExampleComponent } from './copy-service-example.component';
import { CopyServiceButtonExampleComponent } from './copy-service-button-example.component';

@NgModule({
  declarations: [
    CopyServiceButtonExampleComponent,
    CopyServiceExampleComponent
  ],
  imports: [
    CommonModule,
    CopyServiceModule,
    DemoComponentsModule,
    NotificationModule,
    TabsModule.forRoot()
  ],
  providers: [
    CopyService,
    TabsetConfig
  ]
})
export class CopyServiceExampleModule {
  constructor() {}
}
