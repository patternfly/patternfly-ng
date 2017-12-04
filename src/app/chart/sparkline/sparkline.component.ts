import {
  Component,
  DoCheck,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { cloneDeep, defaultsDeep, isEqual, merge, uniqueId } from 'lodash';

import { ChartBase } from '../chart.base';
import { ChartDefaults } from '../chart.defaults';
import { SparklineConfig } from './sparkline-config';
import { SparklineData } from './sparkline-data';

/**
 * Sparkline chart component based on C3
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-chart-sparkline',
  templateUrl: './sparkline.component.html'
})
export class SparklineComponent extends ChartBase implements DoCheck, OnInit {
  /**
   * Chart data
   */
  @Input() chartData: SparklineData;

  /**
   * Configuration object containing details about how to render the chart
   */
  @Input() config: SparklineConfig;

  private defaultConfig: SparklineConfig;
  private prevChartData: SparklineData;
  private prevConfig: SparklineConfig;

  /**
   * Default constructor
   * @param chartDefaults
   */
  constructor(private chartDefaults: ChartDefaults) {
    super();
  }

  /**
   * Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfigDefaults();
    this.setupConfig();
    this.generateChart(this.config, true);
  }

  /**
   * Check if the component config has changed
   */
  ngDoCheck(): void {
    if (!isEqual(this.config, this.prevConfig) || !isEqual(this.chartData, this.prevChartData)) {
      this.setupConfig();
      this.generateChart(this.config, true);
    }
  }

  /**
   * Set up default config
   */
  protected setupConfig(): void {
    if (this.config !== undefined) {
      defaultsDeep(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }

    /*
     * Setup Axis options. Default is to not show either axis. This can be overridden in two ways:
     *   1) in the config, setting showAxis to true will show both axes
     *   2) in the attributes showXAxis and showYAxis will override the config if set
     *
     * By default only line and the tick marks are shown, no labels. This is a sparkline and should be used
     * only to show a brief idea of trending. This can be overridden by setting the config.axis options per C3
     */
    if (this.config.axis !== undefined) {
      this.config.axis.x.show = this.config.showXAxis === true;
      this.config.axis.y.show = this.config.showYAxis === true;
    }
    if (this.config.chartHeight !== undefined) {
      this.config.size.height = this.config.chartHeight;
    }
    this.config.data = merge(this.config.data, this.getChartData());
    this.prevConfig = cloneDeep(this.config);
    this.prevChartData = cloneDeep(this.chartData);
  }

  /**
   * Set up config defaults
   */
  protected setupConfigDefaults(): void {
    this.defaultConfig = this.chartDefaults.getDefaultSparklineConfig();

    this.defaultConfig.axis = {
      x: {
        show: this.config.showXAxis === true,
        type: 'timeseries',
        tick: {
          format: () => {
            return ''; // change to lambda ?
          }
        }
      },
      y: {
        show: this.config.showYAxis === true,
        tick: {
          format: () => {
            return ''; // change to lambda ?
          }
        }
      }
    };
    this.defaultConfig.chartId = uniqueId(this.config.chartId);
    this.defaultConfig.data = { type: 'area' };
    this.defaultConfig.tooltip = this.tooltip();
    this.defaultConfig.units = '';
  }

  // Chart

  /**
   * Convert chartData to C3 data property
   */
  protected getChartData(): any {
    let data: any = {};

    if (this.chartData && this.chartData.dataAvailable !== false && this.chartData.xData && this.chartData.yData) {
      data.x = this.chartData.xData[0];
      data.columns = [
        this.chartData.xData,
        this.chartData.yData
      ];
    }
    return data;
  }

  /**
   * Tooltip function for sparklines
   *
   * @returns {{contents: ((d:any)=>string), position: ((data:any, width:number,
   *            height:number, element:any)=>{top: number, left: number})}}
   */
  tooltip(): any {
    return {
      contents: (d: any) => {
        let tipRows;
        let percentUsed = 0;

        switch (this.config.tooltipType) {
          case 'usagePerDay':
            if (this.chartData.dataAvailable !== false && this.chartData.total > 0) {
              percentUsed = Math.round(d[0].value / this.chartData.total * 100.0);
            }
            tipRows =
              '<tr>' +
              '  <th colspan="2">' + d[0].x.toLocaleDateString() + '</th>' +
              '</tr>' +
              '<tr>' +
              '  <td class="name">' + percentUsed + '%:' + '</td>' +
              '  <td class="value text-nowrap">' + d[0].value + ' '
              + (this.config.units ? this.config.units + ' ' : '') + d[0].name + '</td>' +
              '</tr>';
            break;
          case 'valuePerDay':
            tipRows =
              '<tr>' +
              '  <td class="value">' + d[0].x.toLocaleDateString() + '</td>' +
              '  <td class="value text-nowrap">' + d[0].value + ' ' + d[0].name + '</td>' +
              '</tr>';
            break;
          case 'percentage':
            percentUsed = Math.round(d[0].value / this.chartData.total * 100.0);
            tipRows =
              '<tr>' +
              '  <td class="name">' + percentUsed + '%' + '</td>' +
              '</tr>';
            break;
          default:
            tipRows = this.chartDefaults.getDefaultSparklineTooltip().contents(d);
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
          center = parseInt(element.getAttribute('x'), 10);
          top = parseInt(element.getAttribute('y'), 10);
          chartBox = document.querySelector('#' + this.config.chartId).getBoundingClientRect();
          graphOffsetX = document.querySelector('#' + this.config.chartId + ' g.c3-axis-y')
            .getBoundingClientRect().right;
          x = Math.max(0, center + graphOffsetX - chartBox.left - Math.floor(width / 2));

          return {
            top: top - height,
            left: Math.min(x, chartBox.width - width)
          };
        } catch (e) {
        }
      }
    };
  }

  // Private

  private getTooltipTableHTML(tipRows: any): string {
    return '<div class="module-triangle-bottom">' +
      '  <table class="c3-tooltip">' +
      '    <tbody>' +
      tipRows +
      '    </tbody>' +
      '  </table>' +
      '</div>';
  }
}
