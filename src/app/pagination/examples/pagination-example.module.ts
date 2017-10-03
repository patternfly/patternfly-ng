import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsModule, TabsetConfig } from "ngx-bootstrap";
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { PaginationModule } from "../pagination.module";
import { PaginationExampleComponent } from './pagination-example.component';
@NgModule({
  declarations: [
      PaginationExampleComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    CommonModule,
    FormsModule,
    DemoComponentsModule,
    PaginationModule
  ],
  exports: [ PaginationExampleComponent ],
  providers: [
    BsDropdownConfig,
    TabsetConfig
  ]
})
export class PaginationExampleModule {
  constructor() {}
}
