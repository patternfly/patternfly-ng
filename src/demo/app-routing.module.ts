import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutModalExampleComponent } from '../app/modal/about-modal/example/about-modal-example.component';
import { ActionExampleComponent } from '../app/action/example/action-example.component';
import { ApplicationLauncherExampleComponent }
  from '../app/navigation/application-launcher/example/application-launcher-example.component';
import { DonutChartExampleComponent }
  from '../app/chart/donut-chart/basic-donut-chart/example/donut-chart-example.component';
import { BlockCopyExampleComponent } from '../app/copy/block-copy/example/block-copy-example.component';
import { CardExampleComponent } from '../app/card/basic-card/example/card-example.component';
import { CopyServiceExampleComponent } from '../app/copy/copy-service/example/copy-service-example.component';
import { EmptyStateExampleComponent } from '../app/empty-state/example/empty-state-example.component';
import { FilterExampleComponent } from '../app/filter/example/filter-example.component';
import { InfoStatusCardExampleComponent }
  from '../app/card/info-status-card/example/info-status-card-example.component';
import { InlineCopyExampleComponent } from '../app/copy/inline-copy/example/inline-copy-example.component';
import { InlineNotificationExampleComponent }
  from '../app/notification/inline-notification/example/inline-notification-example.component';
import { ListExampleComponent } from '../app/list/basic-list/example/list-example.component';
import { NotificationDrawerExampleComponent }
from '../app/notification/notification-drawer/example/notification-drawer-example.component';
import { NotificationServiceExampleComponent }
  from '../app/notification/notification-service/example/notification-service-example.component';
import { PaginationExampleComponent } from '../app/pagination/example/pagination-example.component';
import { RemainingCharsCountExampleComponent }
  from '../app/remaining-chars-count/example/remaining-chars-count-example.component';
import { SampleComponent } from '../app/sample/sample.component';
import { SampleExampleComponent } from '../app/sample/example/sample-example.component';
import { SearchHighlightExampleComponent }
  from '../app/pipe/search-highlight/example/search-highlight-example.component';
import { SortExampleComponent } from '../app/sort/example/sort-example.component';
import { SortArrayExampleComponent } from '../app/pipe/sort-array/example/sort-array-example.component';
import { SparklineChartExampleComponent } from '../app/chart/sparkline-chart/example/sparkline-chart-example.component';
import { TableExampleComponent } from '../app/table/basic-table/example/table-example.component';
import { ToastNotificationExampleComponent }
  from '../app/notification/toast-notification/example/toast-notification-example.component';
import { ToastNotificationListExampleComponent }
  from '../app/notification/toast-notification-list/example/toast-notification-list-example.component';
import { ToolbarExampleComponent } from '../app/toolbar/example/toolbar-example.component';
import { TreeListExampleComponent } from '../app/list/tree-list/example/tree-list-example.component';
import { TruncateExampleComponent } from '../app/pipe/truncate/example/truncate-example.component';
import { UtilizationDonutChartExampleComponent }
  from '../app/chart/donut-chart/utilization-donut-chart/example/utilization-donut-chart-example.component';
import { WelcomeComponent } from './components/welcome.component';
import { WizardExampleComponent } from '../app/wizard/example/wizard-example.component';
import { VerticalNavigationExampleComponent }
  from '../app/navigation/vertical-navigation/example/vertical-navigation-example.component';

const routes: Routes = [{
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  }, {
    path: 'aboutmodal',
     component: AboutModalExampleComponent
  }, {
    path: 'action',
    component: ActionExampleComponent
  }, {
    path: 'applauncher',
    component: ApplicationLauncherExampleComponent,
    children: [{
      path: '**',
      component: SampleComponent,
    }]
  }, {
    path: 'blockcopy',
    component: BlockCopyExampleComponent
  }, {
    path: 'card',
    component: CardExampleComponent
  }, {
    path: 'copyservice',
    component: CopyServiceExampleComponent
  }, {
    path: 'donut',
    component: DonutChartExampleComponent
  }, {
    path: 'infocard',
    component: InfoStatusCardExampleComponent
  }, {
    path: 'inlinecopy',
    component: InlineCopyExampleComponent
  }, {
    path: 'emptystate',
    component: EmptyStateExampleComponent
  }, {
    path: 'filters',
    component: FilterExampleComponent
  }, {
    path: 'inlinenotification',
    component: InlineNotificationExampleComponent
  }, {
    path: 'list',
    component: ListExampleComponent
  }, {
    path: 'notificationservice',
    component: NotificationServiceExampleComponent
  }, {
    path: 'notificationdrawer',
    component: NotificationDrawerExampleComponent
  }, {
    path: 'pagination',
    component: PaginationExampleComponent
  }, {
    path: 'remainingcharscount',
    component: RemainingCharsCountExampleComponent
  }, {
    path: 'sample',
    component: SampleExampleComponent
  }, {
    path: 'searchhighlight',
    component: SearchHighlightExampleComponent
  }, {
    path: 'sort',
    component: SortExampleComponent
  }, {
    path: 'sortarray',
    component: SortArrayExampleComponent
  }, {
    path: 'sparkline',
    component: SparklineChartExampleComponent
  }, {
    path: 'toastnotification',
    component: ToastNotificationExampleComponent
  }, {
    path: 'toastnotificationlist',
    component: ToastNotificationListExampleComponent
  }, {
    path: 'table',
    component: TableExampleComponent
  }, {
    path: 'toolbar',
    component: ToolbarExampleComponent
  }, {
    path: 'treelist',
    component: TreeListExampleComponent
  }, {
    path: 'truncate',
    component: TruncateExampleComponent
  }, {
    path: 'utilization-donut',
    component: UtilizationDonutChartExampleComponent
  }, {
    path: 'verticalnavigation',
    component: VerticalNavigationExampleComponent,
    children: [{
      path: '**',
      component: SampleComponent,
    }]
  }, {
    path: 'welcome',
    component: WelcomeComponent
  }, {
    path: 'wizard',
    component: WizardExampleComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
