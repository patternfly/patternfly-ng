import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ChartDefaults } from '../chart-defaults';
import { DonutChartComponent } from './basic-donut-chart/donut-chart.component';
import { WindowReference } from '../../utilities/window.reference';

/**
 * Donut chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <code>require('patternfly/dist/js/patternfly-settings');</code>
 *
 * @deprecated Use DonutChartComponent
 *
 * import { DonutChartComponent } from 'patternfly-ng/chart';
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-chart-donut',
  templateUrl: './basic-donut-chart/donut-chart.component.html'
})
export class DonutComponent extends DonutChartComponent {
  constructor(protected chartDefaults: ChartDefaults, protected windowRef: WindowReference) {
    super(chartDefaults, windowRef);
    console.log('patternfly-ng: DonutComponent is deprecated; use DonutChartComponent');
  }
}
