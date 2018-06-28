import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { CopyService } from '../copy.service';
import { CopyServiceExampleComponent } from './copy-service-example.component';
import { CopyServiceButtonExampleComponent } from './copy-service-button-example.component';
import { ToastNotificationListModule }
  from '../../../notification/toast-notification-list/toast-notification-list.module';

@NgModule({
  declarations: [
    CopyServiceButtonExampleComponent,
    CopyServiceExampleComponent
  ],
  imports: [
    CommonModule,
    DemoComponentsModule,
    TabsModule.forRoot(),
    ToastNotificationListModule
  ],
  providers: [
    CopyService,
    TabsetConfig
  ]
})
export class CopyServiceExampleModule {
  constructor() {}
}
