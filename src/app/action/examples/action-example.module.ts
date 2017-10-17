import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { ActionModule } from '../action.module';
import { ActionExampleComponent } from './action-example.component';

@NgModule({
  declarations: [ActionExampleComponent],
  imports: [ActionModule, BsDropdownModule.forRoot(), CommonModule, DemoComponentsModule, TabsModule.forRoot()],
  providers: [BsDropdownConfig, TabsetConfig]
})
export class ActionExampleModule {
  constructor() {}
}
