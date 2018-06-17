import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { ListComponent } from './list.component';
import { ListConfig } from './list-config';
import { ListEvent } from '../list-event';
import { ListExpandToggleComponent } from './list-expand-toggle.component';
import { PipeModule } from '../../pipe/pipe.module';

export {
  ListConfig,
  ListEvent
};

/**
 * A module containing objects associated with basic list components
 */
@NgModule({
  imports: [
    CommonModule,
    EmptyStateModule,
    FormsModule,
    PipeModule
  ],
  declarations: [ListComponent, ListExpandToggleComponent],
  exports: [ListComponent, ListExpandToggleComponent]
})
export class ListModule {}
