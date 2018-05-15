import { DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ChartDefaults } from '../chart-defaults';
import { ChartBase } from '../chart-base';
import { DonutConfig } from './donut-config';
import { WindowReference } from '../../utilities/window.reference';
/**
 * Donut chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <code>require('patternfly/dist/js/patternfly-settings');</code>
 */
export declare class DonutComponent extends ChartBase implements DoCheck, OnDestroy, OnInit {
    protected chartDefaults: ChartDefaults;
    private windowRef;
    /**
     * An array containing key value pairs:
     *
     * key - string representing an arc within the donut chart
     * value - number representing the value of the arc
     */
    chartData: any[];
    /**
     * Configuration object containing details about how to render the chart
     */
    config: DonutConfig;
    private defaultConfig;
    private prevChartData;
    private prevConfig;
    private subscriptions;
    /**
     * Default constructor
     * @param chartDefaults
     */
    constructor(chartDefaults: ChartDefaults, windowRef: WindowReference);
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Clean up subscriptions
     */
    ngOnDestroy(): void;
    /**
     * Set up default config
     */
    protected setupConfig(): void;
    /**
     * Set up default config
     */
    protected setupConfigDefaults(): void;
    /**
     * Convert chartData to C3 data property
     */
    protected getChartData(): any;
    /**
     * Returns an object containing center label properties
     * @returns {any}
     */
    getCenterLabelText(): any;
    private chartAvailable(chart);
    private getTotal();
    private setupDonutChartTitle(chart);
}
