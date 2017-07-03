import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmptyStateExampleComponent } from '../app/empty-state/examples/empty-state-example.component';
import { FilterExampleComponent } from '../app/filter/examples/filter-example.component';
import { ListExampleComponent } from '../app/list/examples/list-example.component';
import { NotificationServiceExampleComponent } from '../app/notification/examples/notification-service-example.component';
import { RemainingCharsCountExampleComponent } from '../app/remaining-chars-count/examples/remaining-chars-count-example.component';
import { SampleExampleComponent } from '../app/sample/examples/sample-example.component';
import { SearchHighlightExampleComponent } from '../app/search-highlight/examples/search-highlight-example.component';
import { SortExampleComponent } from '../app/sort/examples/sort-example.component';
import { ToastNotificationExampleComponent } from '../app/notification/examples/toast-notification-example.component';
import { ToolbarExampleComponent } from '../app/toolbar/examples/toolbar-example.component';
import { WelcomeComponent } from './components/welcome.component';

const routes: Routes = [{
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  }, {
    path: 'emptystate',
    component: EmptyStateExampleComponent
  }, {
    path: 'filters',
    component: FilterExampleComponent
  }, {
    path: 'list',
    component: ListExampleComponent
  }, {
    path: 'notificationservice',
    component: NotificationServiceExampleComponent
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
    path: 'toastnotification',
    component: ToastNotificationExampleComponent
  }, {
    path: 'toolbar',
    component: ToolbarExampleComponent
}];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
