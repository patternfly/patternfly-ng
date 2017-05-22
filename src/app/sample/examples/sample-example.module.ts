import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SampleModule } from '../sample.module';
import { SampleExampleComponent } from './sample-example.component';
import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { TabsModule, TabsetConfig } from 'ng2-bootstrap';

@NgModule({
  imports: [ CommonModule, FormsModule, SampleModule, DemoComponentsModule, TabsModule ],
  exports: [ SampleExampleComponent ],
  declarations: [ SampleExampleComponent ],
  providers: [ TabsetConfig ]
})
export class SampleExampleModule {
  constructor() {}
}
