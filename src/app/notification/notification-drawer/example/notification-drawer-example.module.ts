import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { NotificationDrawerExampleComponent } from './notification-drawer-example.component';
import { NotificationDrawerModule } from '../notification-drawer.module';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { ActionModule } from '../../../action/action.module';

@NgModule({
  imports: [
    ActionModule,
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    NotificationDrawerModule,
    TabsModule.forRoot()
  ],
  declarations: [NotificationDrawerExampleComponent],
  providers: [TabsetConfig]
})
export class NotificationDrawerExampleModule {
  constructor() {}
}
