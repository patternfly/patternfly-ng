import {
  Component,
  DoCheck,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { cloneDeep, defaultsDeep, isEqual, merge, uniqueId } from 'lodash';

import * as d3 from 'd3';

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
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-chart-donut',
  templateUrl: './donut.component.html'
})
export class DonutComponent extends ChartBase implements DoCheck, OnDestroy, OnInit {
  /**
   * An array containing key value pairs:
   *
   * key - string representing an arc within the donut chart
   * value - number representing the value of the arc
   */
  @Input() chartData: any[];

  /**
   * Configuration object containing details about how to render the chart
   */
  @Input() config: DonutConfig;

  private defaultConfig: DonutConfig;
  private prevChartData: any[];
  private prevConfig: DonutConfig;
  private subscriptions: Subscription[] = [];

  /**
   * Default constructor
   * @param chartDefaults
   */
  constructor(private chartDefaults: ChartDefaults, private windowRef: WindowReference) {
    super();
    this.subscriptions.push(this.chartLoaded.subscribe({
      next: (chart: any) => {
        this.chartAvailable(chart);
      }
    }));
  }

  /**
   * Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfigDefaults();
    this.setupConfig();
    this.generateChart(this.config);
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
   * Clean up subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe);
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

    if (this.config.chartHeight !== undefined) {
      this.config.size.height = this.config.chartHeight;
    }
    this.config.data = merge(this.config.data, this.getChartData());
    this.prevConfig = cloneDeep(this.config);
    this.prevChartData = cloneDeep(this.chartData);
  }

  /**
   * Set up default config
   */
  protected setupConfigDefaults(): void {
    this.defaultConfig = this.chartDefaults.getDefaultDonutConfig();
    this.defaultConfig.chartId = uniqueId();
    this.defaultConfig.data = {
      type: 'donut',
      order: null
    };
    this.defaultConfig.donut = this.chartDefaults.getDefaultDonut();
    this.defaultConfig.tooltip = { contents: (this.windowRef.nativeWindow).patternfly.pfDonutTooltipContents };
  }

  /**
   * Convert chartData to C3 data property
   */
  protected getChartData(): any {
    return {
      columns: this.chartData,
      colors: this.config.colors
    };
  }

  /**
   * Returns an object containing center label properties
   * @returns {any}
   */
  getCenterLabelText(): any {
    // Public for testing
    let centerLabelText = {
      bigText: this.getTotal(),
      smText: this.config.donut.title
    };
    if (this.config.centerLabel) {
      centerLabelText.bigText = this.config.centerLabel;
      centerLabelText.smText = '';
    }
    return centerLabelText;
  }

  // Private

  private chartAvailable(chart: any): void {
    this.setupDonutChartTitle(chart);
  }

  private getTotal(): number {
    let total = 0;
    if (this.config.data !== undefined && this.config.data.columns !== undefined) {
      this.config.data.columns.forEach((element: any) => {
        if (!isNaN(element[1])) {
          total += Number(element[1]);
        }
      });
    }
    return total;
  }

  private setupDonutChartTitle(chart: any): void {
    let donutChartTitle, centerLabelText;

    if (chart === undefined) {
      return;
    }

    donutChartTitle = d3.select(chart.element).select('text.c3-chart-arcs-title');
    if (donutChartTitle === undefined) {
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
}
