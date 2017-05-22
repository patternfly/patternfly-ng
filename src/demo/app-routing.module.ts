import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleExampleComponent } from '../app/sample/examples/sample-example.component';


const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },{
    path: 'sample',
    component: SampleExampleComponent
}];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
