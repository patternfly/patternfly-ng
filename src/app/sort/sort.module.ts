import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'ng2-bootstrap';

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
  imports: [ CommonModule, DropdownModule ],
  declarations: [ SortComponent ],
  exports: [ SortComponent ]
})
export class SortModule { }
