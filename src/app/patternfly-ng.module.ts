import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ActionModule,
  CardModule,
  ChartModule,
  CopyModule,
  EmptyStateModule,
  FilterModule,
  ListModule,
  ModalModule,
  NavigationModule,
  NotificationModule,
  PaginationModule,
  PipeModule,
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
    ChartModule,
    CopyModule,
    EmptyStateModule,
    FilterModule,
    ListModule,
    ModalModule,
    NavigationModule,
    NotificationModule,
    PaginationModule,
    RemainingCharsCountModule,
    PipeModule,
    SampleModule,
    SortModule,
    TableModule,
    ToolbarModule,
    WizardModule
  ]
})
export class PatternFlyNgModule {
}
