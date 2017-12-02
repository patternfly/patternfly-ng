import { EventEmitter, Input, Output } from '@angular/core';

import * as c3 from 'c3';

import { cloneDeep } from 'lodash';

import { ChartConfig } from './chart-config';

export abstract class ChartBase {
  /**
   * Chart configuration object with data
   */
  @Input() public config: ChartConfig;

  /**
   * Event emitted with the chart reference after load is complete
   * @type {EventEmitter}
   */
  @Output() chartLoaded: EventEmitter<any> = new EventEmitter();

  /**
   * Stored previous config to check for any changes
   */
  protected prevConfig: ChartConfig;

  // store the chart object
  private chart: any;

  constructor() {
  }

  /**
   * Protected method called when configuration or data changes by any class that inherits from this
   * @param chartId
   * @param reload
   */
  protected generateChart(chartId: string, reload?: boolean): void {
    setTimeout(() => {
      let c3Config = this.config;
      if (c3Config) {
        c3Config.bindto = '#' + chartId;
        // always re-generate donut pct chart because it's colors
        // change based on data and thresholds
        if (!this.chart || reload || chartId.indexOf('donutPctChart') > -1) {
          this.chart = c3.generate(c3Config);
        } else {
          // if chart is already created, then we only need to re-load data
          this.chart.load(this.config.data);
        }

        this.chartLoaded.emit(this.chart);
        this.prevConfig = cloneDeep(this.config);
      }
    });
  }
}
