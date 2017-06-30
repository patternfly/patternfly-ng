import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { EmptyStateModule } from '../empty-state/empty-state.module';
import { ListActionsComponent } from './list-actions.component';
import { ListComponent } from './list.component';
import { ListCompoundToggleComponent } from './list-compound-toggle.component';
import { ListConfig } from './list-config';
import { ListEvent } from './list-event';

export {
  ListConfig,
  ListEvent
}

/**
 * A module containing objects associated with list components
 */
@NgModule({
  imports: [ BsDropdownModule, CommonModule, EmptyStateModule, FormsModule ],
  declarations: [ ListActionsComponent, ListComponent, ListCompoundToggleComponent ],
  exports: [ ListActionsComponent, ListComponent, ListCompoundToggleComponent ],
  providers: [ BsDropdownConfig ]
})
export class ListModule { }
