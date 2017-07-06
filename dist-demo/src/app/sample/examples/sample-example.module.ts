import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { SampleModule } from '../sample.module';
import { SampleExampleComponent } from './sample-example.component';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    SampleModule,
    TabsModule.forRoot()
  ],
  declarations: [ SampleExampleComponent ],
  exports: [ SampleExampleComponent ],
  providers: [ TabsetConfig ]
})
export class SampleExampleModule {
  constructor() {}
}
