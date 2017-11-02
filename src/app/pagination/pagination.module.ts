import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PaginationConfig } from './pagination-config';
import { PaginationComponent } from './pagination.component';
import { PaginationEvent } from './pagination-event';

export {
  PaginationConfig,
  PaginationEvent
};

/**
 * A module containing objects associated with notification components
 */
@NgModule({
  imports: [BsDropdownModule.forRoot(),
    CommonModule,
    FormsModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  providers: [BsDropdownConfig]
})
export class PaginationModule {}
