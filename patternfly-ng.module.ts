import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ActionModule } from './src/app/action/action.module';
import { CardModule } from './src/app/card/card.module';
import { ChartModule } from './src/app/chart/chart.module';
import { EmptyStateModule } from './src/app/empty-state/empty-state.module';
import { FilterModule } from './src/app/filter/filter.module';
import { ListModule } from './src/app/list/list.module';
import { NavigationModule } from './src/app/navigation/navigation.module';
import { NotificationModule } from './src/app/notification/notification.module';
import { PaginationModule } from './src/app/pagination/pagination.module';
import { RemainingCharsCountModule } from './src/app/remaining-chars-count/remaining-chars-count.module';
import { SampleModule } from './src/app/sample/sample.module';
import { SearchHighlightModule } from './src/app/search-highlight/search-highlight.module';
import { SortModule } from './src/app/sort/sort.module';
import { ToolbarModule } from './src/app/toolbar/toolbar.module';
import { TruncateModule } from './src/app/truncate/truncate.module';
import { WizardModule } from './src/app/wizard/wizard.module';

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
    NavigationModule,
    NotificationModule,
    PaginationModule,
    RemainingCharsCountModule,
    SampleModule,
    SearchHighlightModule,
    SortModule,
    ToolbarModule,
    TruncateModule,
    WizardModule
  ]
})
export class PatternFlyNgModule {
}
