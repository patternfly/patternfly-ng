import { ChartConfigBase } from './chart-config-base';

/**
 * A base config containing properties for charts
 *
 * @deprecated Use ChartConfigBase
 *
 * import { ChartConfigBase } from patternfly-ng/chart;
 */
export abstract class ChartConfig extends ChartConfigBase {
  constructor() {
    super();
    console.log('patternfly-ng: ChartConfig is deprecated; use ChartConfigBase');
  }
}
