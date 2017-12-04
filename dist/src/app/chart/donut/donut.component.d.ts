import { DoCheck, OnInit } from '@angular/core';
import { ChartDefaults } from '../chart.defaults';
import { ChartBase } from '../chart.base';
import { DonutConfig } from './donut-config';
export declare class DonutComponent extends ChartBase implements DoCheck, OnInit {
    private chartDefaults;
    chartData: any;
    config: DonutConfig;
    private prevChartData;
    private subscriptions;
    /**
     * Default constructor
     * @param chartDefaults
     */
    constructor(chartDefaults: ChartDefaults);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    getCenterLabelText(): any;
    private chartAvailable(chart);
    private getTotal();
    private setupDonutChartTitle(chart);
    private getDonutData(chartData);
    private setupConfigDefaults();
    private updateConfig();
}
