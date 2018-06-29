import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DonutChartModule } from '../donut-chart.module';
import { DemoComponentsModule } from '../../../../../demo/components/demo-components.module';
import { DonutChartBasicExampleComponent } from './donut-chart-basic-example.component';
import { DonutChartDynamicExampleComponent } from './donut-chart-dynamic-example.component';
import { DonutChartExampleComponent } from './donut-chart-example.component';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsModule,
    DonutChartModule,
    FormsModule,
    TabsModule.forRoot()
  ],
  declarations: [DonutChartBasicExampleComponent, DonutChartDynamicExampleComponent, DonutChartExampleComponent],
  providers: [TabsetConfig]
})
export class DonutChartExampleModule {
  constructor() { }
}
