import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TreeModule } from 'angular-tree-component';

import { EmptyStateModule } from '../empty-state/empty-state.module';
import { ListBase } from './list-base';
import { ListBaseConfig } from './list-base-config';
import { ListEvent } from './list-event';
import { ListComponent } from './basic-list/list.component';
import { ListConfig } from './basic-list/list-config';
import { ListExpandToggleComponent } from './basic-list/list-expand-toggle.component';
import { TreeListComponent } from './tree-list/tree-list.component';
import { TreeListConfig } from './tree-list/tree-list-config';

export {
  ListBase,
  ListBaseConfig,
  ListConfig,
  ListEvent,
  TreeListConfig
};

/**
 * A module containing objects associated with list components
 */
@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    EmptyStateModule,
    FormsModule,
    TreeModule
  ],
  declarations: [ListComponent, ListExpandToggleComponent, TreeListComponent],
  exports: [ListComponent, ListExpandToggleComponent, TreeListComponent],
  providers: [BsDropdownConfig]
})
export class ListModule {}
