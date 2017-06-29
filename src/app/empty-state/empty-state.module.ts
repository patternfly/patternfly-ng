import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyStateConfig } from './empty-state-config';
import { EmptyStateComponent } from './empty-state.component';

export {
  EmptyStateConfig
}

/**
 * A module containing objects associated with the empty state component
 */
@NgModule({
  imports: [ CommonModule ],
  declarations: [ EmptyStateComponent ],
  exports: [ EmptyStateComponent ]
})
export class EmptyStateModule {}
