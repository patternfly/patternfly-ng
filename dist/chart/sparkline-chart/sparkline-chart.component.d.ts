import { DoCheck, OnInit } from '@angular/core';
import { ChartBase } from '../chart-base';
import { ChartDefaults } from '../chart-defaults';
import { SparklineChartConfig } from './sparkline-chart-config';
import { SparklineChartData } from './sparkline-chart-data';
/**
 * Sparkline chart component
 *
 * Note: In order to use charts, please include the following JavaScript file from PatternFly.
 * <code><pre>
 * require('patternfly/dist/js/patternfly-settings');
 * </pre></code>
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SparklineChartModule } from 'patternfly-ng/chart';
 * // Or
 * import { SparklineChartModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SparklineChartModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { SparklineChartConfig, SparklineChartData } from 'patternfly-ng/chart';
 * </pre></code>
 */
export declare class SparklineChartComponent extends ChartBase implements DoCheck, OnInit {
    protected chartDefaults: ChartDefaults;
    /**
     * Chart data
     */
    chartData: SparklineChartData;
    /**
     * Configuration object containing details about how to render the chart
     */
    config: SparklineChartConfig;
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
    private getTooltipTableHTML;
}
