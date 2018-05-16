import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ChartBase } from './chart-base';
import { ChartConfigBase } from './chart-config-base';
import { ChartDefaults } from './chart-defaults';
import { DonutComponent } from './donut-chart/basic-donut-chart/donut-chart.component';
import { DonutConfig } from './donut-chart/basic-donut-chart/donut-chart-config';
import { DonutChartModule } from './donut-chart/basic-donut-chart/donut-chart.module';
import { SparklineComponent } from './sparkline-chart/sparkline-chart.component';
import { SparklineConfig } from './sparkline-chart/sparkline-chart-config';
import { SparklineData } from './sparkline-chart/sparkline-chart-data';
import { SparklineChartModule } from './sparkline-chart/sparkline-chart.module';
import { WindowReference } from '../utilities/window.reference';

export {
  ChartBase,
  ChartConfigBase,
  ChartDefaults,
  DonutConfig,
  SparklineConfig,
  SparklineData
};

/**
 * A module containing objects associated with chart components
 *
 * @deprecated Use Use DonutChartModule or SparklineChartModule
 */
@NgModule({
  imports: [
    CommonModule,
    DonutChartModule,
    FormsModule,
    SparklineChartModule
  ],
  declarations: [DonutComponent, SparklineComponent],
  exports: [DonutComponent, SparklineComponent],
  providers: [ChartDefaults, WindowReference]
})
export class ChartModule {}
