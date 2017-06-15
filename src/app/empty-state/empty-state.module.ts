import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyStateConfig } from './empty-state-config';
import { EmptyStateComponent } from './empty-state.component';

export {
  EmptyStateConfig
}

@NgModule({
  imports: [ CommonModule ],
  declarations: [ EmptyStateComponent ],
  exports: [ EmptyStateComponent ]
})
export class EmptyStateModule { }
