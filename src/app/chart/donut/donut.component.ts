import { Component, DoCheck, Input, OnInit } from '@angular/core';

import { cloneDeep, defaults, isEqual, merge } from 'lodash';
import { Subscription } from 'rxjs/Subscription';

import { ChartDefaults } from '../chart.defaults';
import { ChartBase } from '../chart.base';
import { DonutConfig } from './donut-config';

import * as d3 from 'd3';

@Component({
  selector: 'pfng-chart-donut',
  templateUrl: './donut.component.html'
})
export class DonutComponent extends ChartBase implements DoCheck, OnInit {

  @Input() chartData: any;
  @Input() config: DonutConfig;

  public donutChartId: any;

  private prevChartData: any;

  private subscriptions: Subscription[] = [];

  /**
   * Default constructor
   * @param chartDefaults
   */
  constructor(private chartDefaults: ChartDefaults) {
    super();
  }

  ngOnInit(): void {
    this.donutChartId = 'donutChart';
    if (this.config.chartId) {
      this.donutChartId = this.config.chartId + this.donutChartId;
    }

    this.subscriptions.push(this.chartLoaded.subscribe({
      next: (chart: any) => {
        this.chartAvailable(chart);
      }
    }));

    this.setupConfigDefaults();
  }

  ngDoCheck(): void {
    if (!isEqual(this.config, this.prevConfig)) {
      this.updateConfig();
      this.generateChart(this.donutChartId, true);
    } else if (!isEqual(this.chartData, this.prevChartData)) {
      this.config.data = merge(this.config.data, this.getDonutData(this.chartData));
      this.generateChart(this.donutChartId, false);
      this.prevChartData = cloneDeep(this.chartData);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  private chartAvailable(chart: any): void {
    this.setupDonutChartTitle(chart);
  }

  private getTotal(): number {
    let total = 0;
    this.chartData.forEach((element: any) => {
      if (!isNaN(element[1])) {
        total += Number(element[1]);
      }
    });

    return total;
  }

  private getCenterLabelText(): any {
    let centerLabelText = {
      bigText: this.getTotal(),
      smText: this.config.donut.title
    };

    if (this.config.centerLabelFn) {
      centerLabelText.bigText = this.config.centerLabelFn();
      centerLabelText.smText = '';
    }

    return centerLabelText;
  }

  private setupDonutChartTitle(chart: any): void {
    let donutChartTitle, centerLabelText;

    if (!chart) {
      return;
    }

    donutChartTitle = d3.select(chart.element).select('text.c3-chart-arcs-title');
    if (!donutChartTitle) {
      return;
    }

    centerLabelText = this.getCenterLabelText();

    donutChartTitle.text('');
    if (centerLabelText.bigText && !centerLabelText.smText) {
      donutChartTitle.text(centerLabelText.bigText);
    } else {
      donutChartTitle.insert('tspan', null).text(centerLabelText.bigText)
        .classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
      donutChartTitle.insert('tspan', null).text(centerLabelText.smText).
        classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
    }
  }

  private getDonutData(chartData: any): any {
    return {
      type: 'donut',
      columns: this.chartData,
      order: null,
      colors: this.config.colors
    };
  }

  private setupConfigDefaults(): void {
    let defaultConfig = this.chartDefaults.getDefaultDonutConfig();
    let defaultDonut = this.chartDefaults.getDefaultDonut();

    defaults(this.config, defaultConfig);
    defaults(this.config.donut, defaultDonut);
  }

  private updateConfig(): void {
    if (this.config.chartHeight) {
      this.config.size.height = this.config.chartHeight;
    }

    this.config.data = merge(this.config.data, this.getDonutData(this.chartData));

    if (this.config.onClickFn) {
      this.config.data.onclick = this.config.onClickFn;
    }
  }
}
