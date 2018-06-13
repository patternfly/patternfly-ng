import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TreeModule } from 'angular-tree-component';

import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { TreeListComponent } from './tree-list.component';

/**
 * A module containing objects associated with tree list components
 *
 * @deprecated The tree-list component is deprecated due to issues with Angular 6 and mobx autorun,
 * introduced by angular-tree-component.
 *
 * See: https://github.com/patternfly/patternfly-ng/issues/381
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
export class TreeListModule {
  constructor() {
    console.log('patternfly-ng: The tree-list component is deprecated due to issues with Angular 6 and ' +
      'mobx autorun, introduced by angular-tree-component.');
  }
}
