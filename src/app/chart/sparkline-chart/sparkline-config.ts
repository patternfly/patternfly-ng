import {SparklineChartConfig} from './sparkline-chart-config';
import {ChartDefaults} from '../chart-defaults';

/**
 * A config containing properties for the sparkline chart
 *
 * @deprecated Use SparklineChartConfig
 *
 * import { SparklineChartConfig } from 'patternfly-ng/chart;
 */
export class SparklineConfig extends SparklineChartConfig {
  constructor() {
    super();
    console.log('patternfly-ng: SparklineConfig is deprecated; use SparklineChartConfig');
  }
}
