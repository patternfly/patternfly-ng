import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { TableEmptyExampleComponent } from './table-empty-example.component';
import { TableExampleComponent } from './table-example.component';
import { TableBasicExampleComponent } from './table-basic-example.component';
import { TableDndExampleComponent } from './table-dnd-example.component';
import { TableEmbeddedExampleComponent } from './table-embedded-example.component';
import { TableFullExampleComponent } from './table-full-example.component';
import { TableExpansionExampleComponent } from './table-expansion-example.component';
import { TableGroupExampleComponent } from './table-group-example.component';
import { TableViewExampleComponent } from './table-view-example.component';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { TableModule } from '../../table.module';
import { ToolbarModule } from '../../../toolbar/toolbar.module';

@NgModule({
  declarations: [
    TableBasicExampleComponent,
    TableDndExampleComponent,
    TableEmbeddedExampleComponent,
    TableEmptyExampleComponent,
    TableExampleComponent,
    TableExpansionExampleComponent,
    TableFullExampleComponent,
    TableGroupExampleComponent,
    TableViewExampleComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    NgxDatatableModule,
    TableModule,
    TabsModule.forRoot(),
    ToolbarModule
  ],
  providers: [BsDropdownConfig, TabsetConfig]
})
export class TableExampleModule {
  constructor() {}
}
