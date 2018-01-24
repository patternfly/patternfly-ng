import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ActionModule } from './action/action.module';
import { CardModule } from './card/card.module';
import { ChartModule } from './chart/chart.module';
import { EmptyStateModule } from './empty-state/empty-state.module';
import { FilterModule } from './filter/filter.module';
import { ListModule } from './list/list.module';
import { ModalModule } from './modal/modal.module';
import { NavigationModule } from './navigation/navigation.module';
import { NotificationModule } from './notification/notification.module';
import { PaginationModule } from './pagination/pagination.module';
import { PipeModule } from './pipe/pipe.module';
import { RemainingCharsCountModule } from './remaining-chars-count/remaining-chars-count.module';
import { SampleModule } from './sample/sample.module';
import { SortModule } from './sort/sort.module';
import { TableModule } from './table/table.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { WizardModule } from './wizard/wizard.module';

@NgModule({
  imports: [
    FormsModule
  ],
  exports: [
    ActionModule,
    CardModule,
    ChartModule,
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
