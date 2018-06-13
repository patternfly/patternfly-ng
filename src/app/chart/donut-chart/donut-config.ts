import { DonutChartConfig } from './basic-donut-chart/donut-chart-config';
import {UtilizationDonutChartConfig} from './utilization-donut-chart/utilization-donut-chart-config';

/**
 * A config containing properties for the sparkline chart
 *
 * @deprecated Use DonutChartConfig
 *
 * import { DonutChartConfig } from 'patternfly-ng/chart;
 */
export class DonutConfig extends DonutChartConfig {
  constructor() {
    super();
    console.log('patternfly-ng: DonutConfig is deprecated; use DonutChartConfig or UtilizationDonutChartConfig');
  }
}
