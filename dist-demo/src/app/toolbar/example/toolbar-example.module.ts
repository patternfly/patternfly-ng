import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

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
    FormsModule,
    TabsModule.forRoot(),
    ToolbarModule
  ],
  providers: [BsDropdownConfig, TabsetConfig]
})
export class ToolbarExampleModule {
  constructor() {}
}
