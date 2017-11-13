import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutModalExampleComponent } from '../app/modal/example/about-modal-example.component';
import { ActionExampleComponent } from '../app/action/example/action-example.component';
import { CardExampleComponent } from '../app/card/basic-card/example/card-example.component';
import { DataTableExampleComponent } from '../app/table/datatable/example/datatable-example.component';
import { DonutExampleComponent } from '../app/chart/donut/example/donut-example.component';
import { EmptyStateExampleComponent } from '../app/empty-state/example/empty-state-example.component';
import { FilterExampleComponent } from '../app/filter/example/filter-example.component';
import { InfoStatusCardExampleComponent }
  from '../app/card/info-status-card/example/info-status-card-example.component';
import { InlineNotificationExampleComponent }
  from '../app/notification/inline-notification/example/inline-notification-example.component';
import { ListExampleComponent } from '../app/list/basic-list/example/list-example.component';
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
import { SparklineExampleComponent } from '../app/chart/sparkline/example/sparkline-example.component';
import { ToastNotificationExampleComponent }
  from '../app/notification/toast-notification/example/toast-notification-example.component';
import { ToastNotificationListExampleComponent }
  from '../app/notification/toast-notification-list/example/toast-notification-list-example.component';
import { ToolbarExampleComponent } from '../app/toolbar/example/toolbar-example.component';
import { TreeListExampleComponent } from '../app/list/tree-list/example/tree-list-example.component';
import { TruncateExampleComponent } from '../app/pipe/truncate/example/truncate-example.component';
import { WelcomeComponent } from './components/welcome.component';
import { WizardExampleComponent } from '../app/wizard/example/wizard-example.component';
import { VerticalNavigationExampleComponent }
  from '../app/navigation/vertical-navigation/example/vertical-navigation-example.component';

const routes: Routes = [{
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  }, {
    path: 'action',
    component: ActionExampleComponent
  }, {
    path: 'card',
    component: CardExampleComponent
  }, {
    path: 'donut',
    component: DonutExampleComponent
  }, {
    path: 'infocard',
    component: InfoStatusCardExampleComponent
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
    path: 'aboutmodal',
    component: AboutModalExampleComponent
  }, {
    path: 'navigation',
    component: VerticalNavigationExampleComponent,
    children: [{
        path: '**',
        component: SampleComponent,
      }]
  }, {
    path: 'notificationservice',
    component: NotificationServiceExampleComponent
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
    component: SparklineExampleComponent
  }, {
    path: 'toastnotification',
    component: ToastNotificationExampleComponent
  }, {
    path: 'toastnotificationlist',
    component: ToastNotificationListExampleComponent
  }, {
    path: 'table',
    component: DataTableExampleComponent
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
