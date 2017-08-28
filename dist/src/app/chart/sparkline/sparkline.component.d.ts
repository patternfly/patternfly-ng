import { DoCheck, OnInit } from '@angular/core';
import { ChartDefaults } from '../chart.defaults';
import { ChartBase } from '../chart.base';
import { SparklineConfig } from './sparkline-config';
/**
 * Sparkline chart component based on C3
 */
export declare class SparklineComponent extends ChartBase implements DoCheck, OnInit {
    private chartDefaults;
    /**
     * Chart data for the chart
     */
    chartData: any;
    /**
     * Configuration object containing details about how to render the chart
     */
    config: SparklineConfig;
    /**
     * The chart id created during initialization
     */
    sparklineChartId: any;
    private prevChartData;
    private defaultConfig;
    /**
     * Default constructor
     * @param chartDefaults
     */
    constructor(chartDefaults: ChartDefaults);
    /**
     * NgOnInit implementation
     */
    ngOnInit(): void;
    /**
     *  Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Tooltip function for sparklines
     * @returns {{contents: ((d:any)=>string), position: ((data:any, width:number, height:number, element:any)=>{top: number, left: number})}}
     */
    sparklineTooltip(): {
        contents: (d: any) => string;
        position: (data: any, width: number, height: number, element: any) => {
            top: number;
            left: number;
        };
    };
    protected getSparklineData(chartData: any): any;
    private setupConfig();
    private updateAll();
    private getTooltipTableHTML(tipRows);
}
