import { Component, DoCheck, Input, OnInit } from '@angular/core';

import { cloneDeep, defaults, isEqual, merge } from 'lodash';
import { ChartBase } from '../chart.base';
import { ChartDefaults } from '../chart.defaults';
import { SparklineConfig } from './sparkline-config';

/**
 * Sparkline chart component based on C3
 */
@Component({
  selector: 'pfng-chart-sparkline',
  templateUrl: './sparkline.component.html'
})
export class SparklineComponent extends ChartBase implements DoCheck, OnInit {
  /**
   * Chart data for the chart
   */
  @Input() chartData: any;

  /**
   * Configuration object containing details about how to render the chart
   */
  @Input() config: SparklineConfig;

  /**
   * The chart id created during initialization
   */
  public sparklineChartId: any;

  private prevChartData: any;
  private defaultConfig: SparklineConfig;

  /**
   * Default constructor
   * @param chartDefaults
   */
  constructor(private chartDefaults: ChartDefaults) {
    super();
  }

  /**
   * NgOnInit implementation
   */
  ngOnInit(): void {
    // Create an ID for the chart based on the chartId in the config if given
    if (this.sparklineChartId === undefined) {
      this.sparklineChartId = 'sparklineChart';
      if (this.config.chartId) {
        this.sparklineChartId = this.config.chartId + this.sparklineChartId;
      }
    }

    this.setupConfig();
    this.updateAll();
    super.generateChart(this.sparklineChartId);
  }

  /**
   *  Check if the component config has changed
   */
  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.chartData, this.prevChartData)) {
      this.updateAll();
    }

    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
      this.generateChart(this.sparklineChartId, true);
    }
  }

  /**
   * Tooltip function for sparklines
   * @returns {{contents: ((d:any)=>string), position: ((data:any, width:number, height:number, element:any)=>{top: number, left: number})}}
   */
  public sparklineTooltip() {
    return {
      contents: (d: any) => {
        let tipRows;
        let percentUsed = 0;

        if (this.config.tooltipFn) {
          tipRows = this.config.tooltipFn(d);
        } else {
          switch (this.config.tooltipType) {
            case 'usagePerDay':
              if (this.chartData.dataAvailable !== false && this.chartData.total > 0) {
                percentUsed = Math.round(d[0].value / this.chartData.total * 100.0);
              }
              tipRows =
                '<tr>' +
                '  <th colspan="2">' +
                d[0].x.toLocaleDateString() +
                '</th>' +
                '</tr>' +
                '<tr>' +
                '  <td class="name">' +
                percentUsed +
                '%:' +
                '</td>' +
                '  <td class="value text-nowrap">' +
                d[0].value +
                ' ' +
                (this.config.units ? this.config.units + ' ' : '') +
                d[0].name +
                '</td>' +
                '</tr>';
              break;
            case 'valuePerDay':
              tipRows =
                '<tr>' +
                '  <td class="value">' +
                d[0].x.toLocaleDateString() +
                '</td>' +
                '  <td class="value text-nowrap">' +
                d[0].value +
                ' ' +
                d[0].name +
                '</td>' +
                '</tr>';
              break;
            case 'percentage':
              percentUsed = Math.round(d[0].value / this.chartData.total * 100.0);
              tipRows = '<tr>' + '  <td class="name">' + percentUsed + '%' + '</td>' + '</tr>';
              break;
            default:
              tipRows = this.chartDefaults.getDefaultSparklineTooltip().contents(d);
          }
        }
        return this.getTooltipTableHTML(tipRows);
      },
      position: (data: any, width: number, height: number, element: any) => {
        let center;
        let top;
        let chartBox;
        let graphOffsetX;
        let x;

        try {
          center = parseInt(element.getAttribute('x'));
          top = parseInt(element.getAttribute('y'));
          chartBox = document.querySelector('#' + this.sparklineChartId).getBoundingClientRect();
          graphOffsetX = document.querySelector('#' + this.sparklineChartId + ' g.c3-axis-y').getBoundingClientRect()
            .right;
          x = Math.max(0, center + graphOffsetX - chartBox.left - Math.floor(width / 2));

          return {
            top: top - height,
            left: Math.min(x, chartBox.width - width)
          };
        } catch (e) {}
      }
    };
  }

  /*
   * Convert the config data to C3 Data
   */
  protected getSparklineData(chartData: any): any {
    const sparklineData: any = {
      type: 'area'
    };

    if (chartData && chartData.dataAvailable !== false && chartData.xData && chartData.yData) {
      sparklineData.x = chartData.xData[0];
      sparklineData.columns = [chartData.xData, chartData.yData];
    }

    return sparklineData;
  }

  private setupConfig(): void {
    this.defaultConfig = this.chartDefaults.getDefaultSparklineConfig();
    this.defaultConfig.axis = {
      x: {
        show: this.config.showXAxis === true,
        type: 'timeseries',
        tick: {
          format: () => {
            return ''; //change to lambda ?
          }
        }
      },
      y: {
        show: this.config.showYAxis === true,
        tick: {
          format: () => {
            return ''; //change to lambda ?
          }
        }
      }
    };

    // Setup the default configuration
    this.defaultConfig.tooltip = this.sparklineTooltip();
    this.defaultConfig.units = '';

    // Override defaults with callers specifications
    defaults(this.config, this.defaultConfig);

    if (this.config.chartHeight) {
      this.defaultConfig.size.height = this.config.chartHeight;
      this.config.size.height = this.config.chartHeight;
    }

    /*
     * Setup Axis options. Default is to not show either axis. This can be overridden in two ways:
     *   1) in the config, setting showAxis to true will show both axes
     *   2) in the attributes showXAxis and showYAxis will override the config if set
     *
     * By default only line and the tick marks are shown, no labels. This is a sparkline and should be used
     * only to show a brief idea of trending. This can be overridden by setting the config.axis options per C3
     */
    if (this.config.axis) {
      this.config.axis.x.show = this.config.showXAxis === true;
      this.config.axis.y.show = this.config.showYAxis === true;
    }
  }

  private updateAll(): void {
    // Need to deep watch changes in chart data
    this.prevChartData = cloneDeep(this.chartData);
    // Convert the given data to C3 chart format
    this.config.data = merge(this.config.data, this.getSparklineData(this.chartData));
  }

  private getTooltipTableHTML(tipRows: any): string {
    return (
      '<div class="module-triangle-bottom">' +
      '  <table class="c3-tooltip">' +
      '    <tbody>' +
      tipRows +
      '    </tbody>' +
      '  </table>' +
      '</div>'
    );
  }
}
