import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SortComponent } from './sort.component';
import { SortConfig } from './sort-config';
import { SortEvent } from './sort-event';
import { SortField } from './sort-field';

export {
  SortConfig,
  SortEvent,
  SortField
}

@NgModule({
  imports: [ CommonModule, BsDropdownModule.forRoot() ],
  declarations: [ SortComponent ],
  exports: [ SortComponent ],
  providers: [ BsDropdownConfig ]
})
export class SortModule { }
