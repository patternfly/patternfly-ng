import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragulaModule, DragulaService } from 'ng2-dragula';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PaginationModule } from '../pagination/pagination.module';
import { EmptyStateModule } from '../empty-state/empty-state.module';
import { NgxDataTableConfig } from './basic-table/ngx-datatable-config';
import { NgxDataTableDndDirective } from './basic-table/ngx-datatable-dnd.directive';
import { TableBase } from './table-base';
import { TableComponent } from './basic-table/table.component';
import { TableConfig } from './basic-table/table-config';
import { TableConfigBase } from './table-config-base';
import { TableEvent } from './table-event';
import { ToolbarModule } from '../toolbar/toolbar.module';

export {
  NgxDataTableConfig,
  TableBase,
  TableConfig,
  TableConfigBase,
  TableEvent
};

/**
 * A module containing objects associated with table components
 */
@NgModule({
  imports: [
    CommonModule,
    DragulaModule,
    EmptyStateModule,
    FormsModule,
    PaginationModule,
    NgxDatatableModule,
    ToolbarModule
  ],
  declarations: [NgxDataTableDndDirective, TableComponent],
  exports: [TableComponent],
  providers: [DragulaService]
})
export class TableModule {}
