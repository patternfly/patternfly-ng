import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DataTableExampleComponent } from './datatable-example.component';
import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { DataTableModule } from '../datatable.module';

@NgModule({
  declarations: [DataTableExampleComponent],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    DataTableModule,
    DemoComponentsModule,
    FormsModule,
    NgxDatatableModule,
    TabsModule.forRoot()
  ],
  providers: [BsDropdownConfig, TabsetConfig]
})
export class DataTableExampleModule {
  constructor() {}
}
