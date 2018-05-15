import { EventEmitter } from '@angular/core';
import { DonutUtilizationConfig } from './donut-utilization-config';
import { DonutComponent } from './donut.component';
/**
 * Donut Utilization chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <code>require('patternfly/dist/js/patternfly-settings');</code>
 */
export declare class DonutUtilizationComponent extends DonutComponent {
    /**
     * Configuration object containing details about how to render the utilization chart
     */
    config: DonutUtilizationConfig;
    /**
     * Event emitted when the Used amount passes a user defined threshold
     * @type {EventEmitter}
     */
    thresholdChanged: EventEmitter<any>;
    private threshold;
    /**
     * Returns an object containing center label properties
     * @returns {any}
     */
    getCenterLabelText(): any;
    /**
     * get C3 chart data from config.gauge properties
     */
    protected getChartData(): any;
    private updateGaugeMetrics();
    private getUtilizationColors();
    private getUtilizationUsedColor(used, thresholds);
}
