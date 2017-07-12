import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ActionModule } from './src/app/action/action.module';
import { EmptyStateModule } from './src/app/empty-state/empty-state.module';
import { FilterModule } from './src/app/filter/filter.module';
import { ListModule } from './src/app/list/list.module';
import { NotificationModule } from './src/app/notification/notification.module';
import { RemainingCharsCountModule } from './src/app/remaining-chars-count/remaining-chars-count.module';
import { SampleModule } from './src/app/sample/sample.module';
import { SearchHighlightModule } from './src/app/search-highlight/search-highlight.module';
import { SortModule } from './src/app/sort/sort.module';
import { ToolbarModule } from './src/app/toolbar/toolbar.module';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
  ],
  exports: [
    ActionModule,
    EmptyStateModule,
    FilterModule,
    ListModule,
    NotificationModule,
    RemainingCharsCountModule,
    SampleModule,
    SearchHighlightModule,
    SortModule,
    ToolbarModule
  ]
})
export class PatternFlyNgModule {
}
