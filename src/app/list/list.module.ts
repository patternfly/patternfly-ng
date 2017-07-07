import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { EmptyStateModule } from '../empty-state/empty-state.module';
import { ListComponent } from './list.component';
import { ListConfig } from './list-config';
import { ListEvent } from './list-event';
import { ListExpandToggleComponent } from './list-expand-toggle.component';

export {
  ListConfig,
  ListEvent
}

/**
 * A module containing objects associated with list components
 */
@NgModule({
  imports: [ BsDropdownModule, CommonModule, EmptyStateModule, FormsModule ],
  declarations: [ ListComponent, ListExpandToggleComponent ],
  exports: [ ListComponent, ListExpandToggleComponent ],
  providers: [ BsDropdownConfig ]
})
export class ListModule { }
