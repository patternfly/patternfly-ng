import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../../demo/components/demo-components.module';
import { UtilizationDonutChartExampleComponent } from './utilization-donut-chart-example.component';
import { UtilizationDonutChartModule } from '../utilization-donut-chart.module';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    UtilizationDonutChartModule,
    TabsModule.forRoot()
  ],
  declarations: [UtilizationDonutChartExampleComponent],
  providers: [TabsetConfig]
})
export class UtilizationDonutChartExampleModule {
  constructor() { }
}
