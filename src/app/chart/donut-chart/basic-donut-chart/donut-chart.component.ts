import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ChartDefaults } from '../../chart-defaults';
import { DonutChartBaseComponent } from '../donut-chart-base.component';
import { WindowReference } from '../../../utilities/window.reference';

/**
 * Donut chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <br/><code>require('patternfly/dist/js/patternfly-settings');</code>
 *
 * Usage:
 * <br/><code>import { DonutChartModule } from 'patternfly-ng/chart';</code>
 *
 * Or:
 * <br/><code>import { DonutChartModule } from 'patternfly-ng';</code>
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-donut-chart',
  templateUrl: './donut-chart.component.html'
})
export class DonutChartComponent extends DonutChartBaseComponent {
  /**
   * Default constructor
   */
  constructor(protected chartDefaults: ChartDefaults, protected windowRef: WindowReference) {
    super(chartDefaults, windowRef);
  }
}

/**
 * @deprecated Use DonutChartComponent
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-chart-donut',
  templateUrl: './donut-chart.component.html'
})
export class DonutComponent extends DonutChartComponent {}
