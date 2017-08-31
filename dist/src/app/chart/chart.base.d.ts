import { EventEmitter } from '@angular/core';
import { ChartConfig } from './chart-config';
export declare abstract class ChartBase {
    /**
     * Chart configuration object with data
     */
    config: ChartConfig;
    /**
     * Event emitted with the chart reference after load is complete
     * @type {EventEmitter}
     */
    chartLoaded: EventEmitter<any>;
    /**
     * Stored previous config to check for any changes
     */
    protected prevConfig: ChartConfig;
    private chart;
    constructor();
    /**
     * Protected method called when configuration or data changes by any class that inherits from this
     * @param chartId
     * @param reload
     */
    protected generateChart(chartId: string, reload?: boolean): void;
}
