import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { ActionModule } from '../../action/action.module';
import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { ListModule } from '../../list/list.module';
import { PaginationModule } from '../pagination.module';
import { PaginationExampleComponent } from './pagination-example.component';
import { PaginationBasicExampleComponent } from './pagination-basic-example.component';
import { PaginationListExampleComponent } from './pagination-list-example.component';
@NgModule({
  declarations: [
    PaginationExampleComponent,
    PaginationBasicExampleComponent,
    PaginationListExampleComponent
  ],
  imports: [
    ActionModule,
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    PaginationModule,
    FormsModule,
    ListModule,
    TabsModule.forRoot(),
  ],
  providers: [BsDropdownConfig, TabsetConfig]
})
export class PaginationExampleModule {
  constructor() {}
}
