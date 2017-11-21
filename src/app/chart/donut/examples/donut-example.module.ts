import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { DonutExampleComponent } from './donut-example.component';
import { ChartModule } from '../../chart.module';

@NgModule({
  declarations: [DonutExampleComponent],
  imports: [
    CommonModule,
    FormsModule,
    DemoComponentsModule,
    ChartModule,
    TabsModule.forRoot()
  ],
  providers: [TabsetConfig]
})
export class DonutExampleModule {
  constructor() { }
}
