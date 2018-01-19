import { DoCheck, OnInit } from '@angular/core';
import { ChartBase } from '../chart-base';
import { ChartDefaults } from '../chart-defaults';
import { SparklineConfig } from './sparkline-config';
import { SparklineData } from './sparkline-data';
/**
 * Sparkline chart component
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <code>require('patternfly/dist/js/patternfly-settings');</code>
 */
export declare class SparklineComponent extends ChartBase implements DoCheck, OnInit {
    private chartDefaults;
    /**
     * Chart data
     */
    chartData: SparklineData;
    /**
     * Configuration object containing details about how to render the chart
     */
    config: SparklineConfig;
    private defaultConfig;
    private prevChartData;
    private prevConfig;
    /**
     * Default constructor
     * @param chartDefaults
     */
    constructor(chartDefaults: ChartDefaults);
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Set up default config
     */
    protected setupConfig(): void;
    /**
     * Set up config defaults
     */
    protected setupConfigDefaults(): void;
    /**
     * Convert chartData to C3 data property
     */
    protected getChartData(): any;
    /**
     * Tooltip function for sparklines
     *
     * @returns {{contents: ((d:any)=>string), position: ((data:any, width:number,
     *            height:number, element:any)=>{top: number, left: number})}}
     */
    tooltip(): any;
    private getTooltipTableHTML(tipRows);
}
