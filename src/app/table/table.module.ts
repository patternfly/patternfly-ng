import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragulaModule, DragulaService } from 'ng2-dragula';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DataTableDragulaDirective } from './datatable/datatable-dragula.directive';
import { PaginationModule } from '../pagination/pagination.module';
import { DataTableComponent } from './datatable/datatable.component';
import { DataTableConfig } from './datatable/datatable-config';
import { TableBase } from './table-base';
import { TableBaseConfig } from './table-base-config';
import { TableEvent } from './table-event';
import { ToolbarModule } from '../toolbar/toolbar.module';

export {
  DataTableConfig,
  TableBase,
  TableBaseConfig,
  TableEvent
};

/**
 * A module containing objects associated with table components
 */
@NgModule({
  imports: [
    CommonModule,
    DragulaModule,
    FormsModule,
    PaginationModule,
    NgxDatatableModule,
    ToolbarModule
  ],
  declarations: [DataTableComponent, DataTableDragulaDirective],
  exports: [DataTableComponent],
  providers: [DragulaService]
})
export class TableModule {}
