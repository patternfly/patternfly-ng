import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragulaModule, DragulaService } from 'ng2-dragula';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DragulaExtendedDirective } from './dragula-extended.directive';
import { PaginationModule } from '../pagination/pagination.module';
import { DataTableComponent } from './datatable.component';
import { DataTableConfig } from './datatable-config';
import { ToolbarModule } from '../toolbar/toolbar.module';

export {
  DataTableConfig
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
  declarations: [DragulaExtendedDirective, DataTableComponent],
  exports: [DataTableComponent],
  providers: [DragulaService]
})
export class DataTableModule {}
