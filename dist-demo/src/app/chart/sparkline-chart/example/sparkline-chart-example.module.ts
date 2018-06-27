import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { SparklineChartExampleComponent } from './sparkline-chart-example.component';
import { SparklineChartModule } from '../sparkline-chart.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DemoComponentsModule,
    SparklineChartModule,
    TabsModule.forRoot()
  ],
  declarations: [SparklineChartExampleComponent],
  providers: [TabsetConfig]
})
export class SparklineChartExampleModule {
  constructor() {}
}
