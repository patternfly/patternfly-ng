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
export declare class DonutChartComponent extends DonutChartBaseComponent {
    protected chartDefaults: ChartDefaults;
    protected windowRef: WindowReference;
    /**
     * Default constructor
     */
    constructor(chartDefaults: ChartDefaults, windowRef: WindowReference);
}
/**
 * @deprecated Use DonutChartComponent
 */
export declare class DonutComponent extends DonutChartComponent {
}
