import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { TabsModule, TabsetConfig } from 'ng2-bootstrap';
import { SampleModule } from '../sample.module';
import { SampleExampleComponent } from './sample-example.component';

@NgModule({
  imports: [ CommonModule, DemoComponentsModule, FormsModule, SampleModule, TabsModule ],
  declarations: [ SampleExampleComponent ],
  exports: [ SampleExampleComponent ],
  providers: [ TabsetConfig ]
})
export class SampleExampleModule {
  constructor() {}
}
