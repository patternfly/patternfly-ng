import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ChartDefaults } from '../chart-defaults';
import { SparklineChartComponent, SparklineComponent } from './sparkline-chart.component';
import { WindowReference } from '../../utilities/window.reference';

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
