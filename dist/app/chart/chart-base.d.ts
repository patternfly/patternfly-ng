import { EventEmitter } from '@angular/core';
import { ChartConfigBase } from './chart-config-base';
/**
 * Chart base
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <code>require('patternfly/dist/js/patternfly-settings');</code>
 */
export declare abstract class ChartBase {
    /**
     * Event emitted with the chart reference after load is complete
     * @type {EventEmitter}
     */
    chartLoaded: EventEmitter<any>;
    private chart;
    /**
     * Default constructor
     */
    constructor();
    /**
     * Protected method called when configuration or data changes by any class that inherits from this
     *
     * @param config The config for the c3 chart
     * @param reload True to reload
     */
    protected generateChart(config: ChartConfigBase, reload?: boolean): void;
}
