import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragulaModule, DragulaService } from 'ng2-dragula';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PaginationModule } from '../../pagination/pagination.module';
import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { NgxDataTableDndDirective } from './ngx-datatable-dnd.directive';
import { TableComponent } from './table.component';
import { ToolbarModule } from '../../toolbar/toolbar.module';

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
