import {SparklineChartData} from './sparkline-chart-data';

/**
 * A base config containing properties for chart data
 *
 * @deprecated Use SparklineChartData
 *
 * import { SparklineChartData } from 'patternfly-ng/chart;
 */
export abstract class SparklineData extends SparklineChartData {
  constructor() {
    super();
    console.log('patternfly-ng: SparklineData is deprecated; use SparklineChartData');
  }
}
