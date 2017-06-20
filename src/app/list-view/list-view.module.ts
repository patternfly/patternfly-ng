import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { EmptyStateModule } from '../empty-state/empty-state.module';
import { ListViewActionsComponent } from './list-view-actions.component';
import { ListViewComponent } from './list-view.component';
import { ListViewCompoundToggleComponent } from './list-view-compound-toggle.component';
import { ListViewConfig } from './list-view-config';
import { ListViewEvent } from './list-view-event';

export {
  ListViewConfig,
  ListViewEvent
}

@NgModule({
  imports: [ BsDropdownModule, CommonModule, EmptyStateModule, FormsModule ],
  declarations: [ ListViewActionsComponent, ListViewComponent, ListViewCompoundToggleComponent ],
  exports: [ ListViewActionsComponent, ListViewComponent, ListViewCompoundToggleComponent ],
  providers: [ BsDropdownConfig ]
})
export class ListViewModule { }
