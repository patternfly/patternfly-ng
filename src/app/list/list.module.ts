import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ListBase } from './list-base';
import { ListConfigBase } from './list-config-base';
import { ListEvent } from './list-event';
import { ListComponent } from './basic-list/list.component';
import { ListModule as BasicListModule } from './basic-list/list.module';
import { ListConfig } from './basic-list/list-config';
import { ListExpandToggleComponent } from './basic-list/list-expand-toggle.component';
import { TreeListComponent } from './tree-list/tree-list.component';
import { TreeListConfig } from './tree-list/tree-list-config';
import { TreeListModule } from './tree-list/tree-list.module';

export {
  ListBase,
  ListConfigBase,
  ListConfig,
  ListEvent,
  TreeListConfig
};

/**
 * A module containing objects associated with list components
 *
 * @deprecated Use individual module imports
 *
 * import {
 *   ListModule, // basic list only
 *   TreeListModule
 * } from 'patternfly-ng/list';
 */
@NgModule({
  imports: [
    BasicListModule,
    CommonModule,
    FormsModule,
    TreeListModule
  ],
  exports: [ListComponent, ListExpandToggleComponent, TreeListComponent]
})
export class ListModule {
  constructor() {
    console.log('patternfly-ng: ListModule is deprecated; use TreeListModule and ListModule for basic list only');
  }
}
