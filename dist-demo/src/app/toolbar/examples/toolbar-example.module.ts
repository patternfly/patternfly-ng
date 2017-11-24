import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { ActionModule } from '../../action/action.module';
import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { FilterModule } from '../../filter/filter.module';
import { ToolbarExampleComponent } from './toolbar-example.component';
import { ToolbarModule } from '../toolbar.module';

@NgModule({
  declarations: [ToolbarExampleComponent],
  imports: [
    ActionModule,
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    FilterModule,
    TabsModule.forRoot(),
    ToolbarModule
  ],
  providers: [BsDropdownConfig, TabsetConfig]
})
export class ToolbarExampleModule {
  constructor() {}
}
