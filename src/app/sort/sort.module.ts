import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SortComponent } from './sort.component';
import { SortConfig } from './sort-config';
import { SortEvent } from './sort-event';
import { SortField } from './sort-field';

export {
  SortConfig,
  SortEvent,
  SortField
};

/**
 * A module containing objects associated with the sort component
 */
@NgModule({
  imports: [CommonModule, BsDropdownModule.forRoot()],
  declarations: [SortComponent],
  exports: [SortComponent],
  providers: [BsDropdownConfig]
})
export class SortModule {}
