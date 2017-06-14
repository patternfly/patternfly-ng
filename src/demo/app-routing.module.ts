import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilterExampleComponent } from '../app/filters/examples/filter-example.component';
import { SampleExampleComponent } from '../app/sample/examples/sample-example.component';
import { SortExampleComponent } from '../app/sort/examples/sort-example.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'home',
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
}];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
