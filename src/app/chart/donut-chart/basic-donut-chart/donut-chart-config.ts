import { DonutChartBaseConfig } from '../donut-chart-base-config';

/**
 * A config containing properties for the sparkline chart
 */
export class DonutChartConfig extends DonutChartBaseConfig {
}

/**
 * @deprecated Use DonutChartConfig
 */
export class DonutConfig extends DonutChartConfig {
  constructor() {
    super();
    console.log('patternfly-ng: DonutConfig is deprecated; use DonutChartConfig or UtilizationDonutChartConfig');
  }
}
