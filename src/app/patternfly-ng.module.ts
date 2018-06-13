import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ActionModule,
  CardModule,
  ChartModule, // @deprecated
  EmptyStateModule,
  FilterModule,
  ListModule,
  ModalModule,
  NavigationModule, // @deprecated
  NotificationServiceModule,
  PaginationModule,
  PipeModule, // @deprecated
  RemainingCharsCountModule,
  SampleModule,
  SortModule,
  TableModule,
  ToolbarModule,
  WizardModule
} from './index';

/**
 * @deprecated Use individual modual imports
 */
@NgModule({
  imports: [
    FormsModule
  ],
  exports: [
    ActionModule,
    CardModule,
    ChartModule, // @deprecated
    EmptyStateModule,
    FilterModule,
    ListModule,
    ModalModule,
    NavigationModule, // @deprecated
    NotificationServiceModule,
    PaginationModule,
    RemainingCharsCountModule,
    PipeModule, // @deprecated
    SampleModule,
    SortModule,
    TableModule,
    ToolbarModule,
    WizardModule
  ]
})
export class PatternFlyNgModule {
}
