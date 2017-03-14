import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },{
  //   path: 'sample',
  //   component: SampleExampleComponent
  // },{
  //   path: 'filter',
  //   component: FilterExampleComponent
  // },{
  //   path: 'sort',
  //   component: SortExampleComponent
  // },{
  //   path: 'toolbar',
  //   component: ToolbarExampleComponent
  // },{
  //   path: 'treelist',
  //   component: TreeListExampleComponent
  // },{
  //   path: 'toastnotification',
  //   component: ToastNotificationExampleComponent
  // },{
  //   path: 'toastnotificationlist',
  //   component: ToastNotificationListExampleComponent
}];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
