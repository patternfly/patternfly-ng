import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule }  from '@angular/core';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { SortArrayExampleComponent } from './sort-array-example.component';
import { SortArrayPipeModule } from '../sort-array.pipe.module';

@NgModule({
  declarations: [SortArrayExampleComponent],
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    SortArrayPipeModule,
    TabsModule.forRoot()
  ],
  providers: [TabsetConfig]
})
export class SortArrayExampleModule {
  constructor() {}
}
