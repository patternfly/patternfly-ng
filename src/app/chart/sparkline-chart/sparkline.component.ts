import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ChartDefaults } from '../chart-defaults';
import { SparklineChartComponent } from './sparkline-chart.component';

/**
 * Sparkline chart component
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <code>require('patternfly/dist/js/patternfly-settings');</code>
 *
 * @deprecated Use SparklineChartComponent
 *
 * import { SparklineChartComponent } from 'patternfly-ng/chart;
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-chart-sparkline',
  templateUrl: './sparkline-chart.component.html'
})
export class SparklineComponent extends SparklineChartComponent {
  constructor(protected chartDefaults: ChartDefaults) {
    super(chartDefaults);
    console.log('patternfly-ng: SparklineComponent is deprecated; use SparklineChartComponent');
  }
}
