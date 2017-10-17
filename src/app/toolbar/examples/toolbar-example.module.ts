import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { ActionModule } from '../../action/action.module';
import { FilterModule } from '../../filter/filter.module';
import { ToolbarModule } from '../toolbar.module';
import { ToolbarExampleComponent } from './toolbar-example.component';

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
