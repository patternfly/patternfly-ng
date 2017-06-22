import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilterExampleComponent } from '../app/filters/examples/filter-example.component';
import { SampleExampleComponent } from '../app/sample/examples/sample-example.component';
import { SortExampleComponent } from '../app/sort/examples/sort-example.component';
import { ToastNotificationExampleComponent } from '../app/notification/examples/toast-notification-example.component';
import { ToastNotificationListExampleComponent } from '../app/notification/examples/toast-notification-list-example.component';
import { WelcomeComponent } from './components/welcome.component';

const routes: Routes = [{
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  }, {
    path: 'filters',
    component: FilterExampleComponent
  }, {
    path: 'sample',
    component: SampleExampleComponent
  }, {
    path: 'sort',
    component: SortExampleComponent
  }, {
    path: 'toastnotification',
    component: ToastNotificationExampleComponent
  }];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
