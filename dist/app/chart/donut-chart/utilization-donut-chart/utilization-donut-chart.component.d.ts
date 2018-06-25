import { EventEmitter } from '@angular/core';
import { ChartDefaults } from '../../chart-defaults';
import { DonutChartBaseComponent } from '../donut-chart-base.component';
import { UtilizationDonutChartConfig } from './utilization-donut-chart-config';
import { WindowReference } from '../../../utilities/window.reference';
/**
 * Donut Utilization chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <br/><code>require('patternfly/dist/js/patternfly-settings');</code>
 *
 * Usage:
 * <br/><code>import { UtilizationDonutChartModule } from 'patternfly-ng/chart';</code>
 *
 * Or:
 * <br/><code>import { UtilizationDonutChartModule } from 'patternfly-ng';</code>
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
    private updateMetrics();
    private getUtilizationColors();
    private getUtilizationUsedColor(used, thresholds);
}
