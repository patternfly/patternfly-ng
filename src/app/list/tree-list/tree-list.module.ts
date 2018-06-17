import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TreeModule } from 'angular-tree-component';

import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { ListEvent } from '../list-event';
import { TreeListComponent } from './tree-list.component';
import { TreeListConfig } from './tree-list-config';

export {
  ListEvent,
  TreeListConfig
};

/**
 * A module containing objects associated with tree list components
 */
@NgModule({
  imports: [
    CommonModule,
    EmptyStateModule,
    FormsModule,
    TreeModule
  ],
  declarations: [TreeListComponent],
  exports: [TreeListComponent]
})
export class TreeListModule {}
