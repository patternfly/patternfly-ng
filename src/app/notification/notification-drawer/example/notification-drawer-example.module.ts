import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';
import { NotificationModule } from '../../notification.module';
import { NotificationDrawerExampleComponent } from './notification-drawer-example.component';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { ActionModule } from '../../../action/action.module';

@NgModule({
    declarations: [
        NotificationDrawerExampleComponent
    ],
    imports: [
      ActionModule,
      CommonModule,
      FormsModule,
      NotificationModule,
      DemoComponentsModule,
      TabsModule.forRoot()
    ],
    providers: [
      TabsetConfig
    ]
  })
  export class NotificationDrawerExampleModule {
    constructor() {}
  }
