import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule }  from '@angular/core';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { PipeModule } from '../../pipe.module';
import { SortArrayExampleComponent } from './sort-array-example.component';

@NgModule({
  declarations: [ SortArrayExampleComponent ],
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    PipeModule,
    TabsModule.forRoot()
  ],
  providers: [ TabsetConfig ]
})
export class SortArrayExampleModule {
  constructor() {}
}
