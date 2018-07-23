import { EventEmitter } from '@angular/core';
import { ChartDefaults } from '../../chart-defaults';
import { DonutChartBaseComponent } from '../donut-chart-base.component';
import { UtilizationDonutChartConfig } from './utilization-donut-chart-config';
import { WindowReference } from '../../../utilities/window.reference';
/**
 * Donut Utilization chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from PatternFly.
 * <code><pre>
 * require('patternfly/dist/js/patternfly-settings');
 * </pre></code>
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { UtilizationDonutChartModule } from 'patternfly-ng/chart';
 * // Or
 * import { UtilizationDonutChartModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [UtilizationDonutChartModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { UtilizationDonutChartConfig } from 'patternfly-ng/chart';
 * </pre></code>
 */
export declare class UtilizationDonutChartComponent extends DonutChartBaseComponent {
    protected chartDefaults: ChartDefaults;
    protected windowRef: WindowReference;
    /**
     * Configuration object containing details about how to render the utilization chart
     */
    config: UtilizationDonutChartConfig;
    /**
     * Event emitted when the Used amount passes a user defined threshold
     * @type {EventEmitter}
     */
    thresholdChanged: EventEmitter<any>;
    private threshold;
    /**
     * Default constructor
     */
    constructor(chartDefaults: ChartDefaults, windowRef: WindowReference);
    /**
     * Returns an object containing center label properties
     * @returns {any}
     */
    getCenterLabelText(): any;
    /**
     * get C3 chart data from config properties
     */
    protected getChartData(): any;
    private updateMetrics;
    private getUtilizationColors;
    private getUtilizationUsedColor;
}
