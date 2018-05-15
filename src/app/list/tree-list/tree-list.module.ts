import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { TreeListComponent } from './tree-list.component';
import { TreeListConfig } from './tree-list-config';
import { TreeModule } from 'angular-tree-component';

export {
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
