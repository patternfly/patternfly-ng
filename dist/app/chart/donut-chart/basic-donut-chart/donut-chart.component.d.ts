import { ChartDefaults } from '../../chart-defaults';
import { DonutChartBaseComponent } from '../donut-chart-base.component';
import { WindowReference } from '../../../utilities/window.reference';
/**
 * Donut chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from PatternFly.
 * <code><pre>
 * require('patternfly/dist/js/patternfly-settings');
 * </pre></code>
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { DonutChartModule } from 'patternfly-ng/chart';
 * // Or
 * import { DonutChartModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [DonutChartModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { DonutChartConfig } from 'patternfly-ng/chart';
 * </pre></code>
 */
export declare class DonutChartComponent extends DonutChartBaseComponent {
    protected chartDefaults: ChartDefaults;
    protected windowRef: WindowReference;
    /**
     * Default constructor
     */
    constructor(chartDefaults: ChartDefaults, windowRef: WindowReference);
}
