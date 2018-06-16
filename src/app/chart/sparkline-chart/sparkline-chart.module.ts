import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ChartDefaults } from '../chart-defaults';
import { SparklineChartComponent, SparklineComponent } from './sparkline-chart.component';
import { SparklineChartConfig } from './sparkline-chart-config';
import { SparklineChartData } from './sparkline-chart-data';
import { WindowReference } from '../../utilities/window.reference';

export {
  SparklineChartConfig,
  SparklineChartData
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SparklineChartComponent, SparklineComponent],
  exports: [SparklineChartComponent, SparklineComponent],
  providers: [ChartDefaults, WindowReference]
})
export class SparklineChartModule {}
