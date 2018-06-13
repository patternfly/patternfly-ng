import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ChartBase } from './chart-base';
import { ChartConfigBase } from './chart-config-base';
import { ChartDefaults } from './chart-defaults';
import { DonutComponent } from './donut-chart/donut.component';
import { DonutConfig } from './donut-chart/donut-config';
import { DonutChartModule } from './donut-chart/basic-donut-chart/donut-chart.module';
import { SparklineComponent } from './sparkline-chart/sparkline.component';
import { SparklineConfig } from './sparkline-chart/sparkline-config';
import { SparklineData } from './sparkline-chart/sparkline-data';
import { SparklineChartModule } from './sparkline-chart/sparkline-chart.module';
import { WindowReference } from '../utilities/window.reference';

export {
  ChartBase,
  ChartConfigBase,
  ChartDefaults
};

// @deprecated Use DonutChartComponent, SparklineChartConfig, and SparklineChartData
export {
  DonutConfig,
  SparklineConfig,
  SparklineData
};

/**
 * A module containing objects associated with chart components
 *
 * @deprecated Use individual module imports
 *
 * import {
 *   DonutChartModule,
 *   SparklineChartModule
 * } from 'patterfnly/chart';
 */
@NgModule({
  imports: [
    CommonModule,
    DonutChartModule,
    FormsModule,
    SparklineChartModule
  ],
  declarations: [ DonutComponent, SparklineComponent ],
  exports: [ DonutComponent, SparklineComponent ],
  providers: [ ChartDefaults, WindowReference ]
})
export class ChartModule {
  constructor() {
    console.log('patternfly-ng: ChartModule is deprecated; use DonutChartModule or SparklineChartModule');
  }
}
