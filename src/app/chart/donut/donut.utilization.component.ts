import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { DonutUtilizationConfig } from './donut-utilization-config';
import { DonutComponent } from './donut.component';

/**
 * Donut Utilization chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <code>require('patternfly/dist/js/patternfly-settings');</code>
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-chart-donut-utilization',
  templateUrl: './donut.utilization.component.html'
})
export class DonutUtilizationComponent extends DonutComponent {
  /**
   * Configuration object containing details about how to render the utilization chart
   */
  @Input() config: DonutUtilizationConfig;

  /**
   * Event emitted when the Used amount passes a user defined threshold
   * @type {EventEmitter}
   */
  @Output() thresholdChanged: EventEmitter<any> = new EventEmitter();

  private threshold: string;

  /**
   * Returns an object containing center label properties
   * @returns {any}
   */
  getCenterLabelText(): any {
    // Public for testing

    this.updateGaugeMetrics();
    const units: string = this.config.gauge.units;
    const available: number = this.config.gauge.available;
    const total: number = this.config.gauge.total;
    const percent: number = this.config.gauge.percent;
    const used: number = this.config.gauge.used;
    const labelFormat: string = this.config.gauge.centerLabelFormat;

    let centerLabelText: any = {};

    if (this.config.gauge.centerLabelFn) {
      let labelText: any = this.config.gauge.centerLabelFn();
      centerLabelText.title = labelText.title;
      centerLabelText.subTitle = labelText.subTitle;
    } else {
      switch (labelFormat) {
        case 'none':
          centerLabelText.title = '';
          centerLabelText.subTitle = '';
          break;
        case 'available':
          centerLabelText.title = available;
          centerLabelText.subTitle = units + ' Available';
          break;
        case 'percent':
          centerLabelText.title = percent + '%';
          centerLabelText.subTitle = 'of ' + total + ' ' + units;
          break;
        default:
          centerLabelText.title = used;
          centerLabelText.subTitle = units + ' Used';
      }
    }

    return centerLabelText;
  }

  /**
   * get C3 chart data from config.gauge properties
   */
  protected getChartData(): any {
    this.updateGaugeMetrics();
    return {
      columns: [
        ['Used', this.config.gauge.used],
        ['Available', this.config.gauge.available]
      ],
      colors: this.getUtilizationColors(),
      groups: [
        ['used', 'available']
      ]
    };
  }

  private updateGaugeMetrics(): any {
    this.config.gauge.available = this.config.gauge.total - this.config.gauge.used;
    this.config.gauge.percent = Math.round(this.config.gauge.used / this.config.gauge.total * 100.0);
  }

  private getUtilizationColors(): any {
    return {
      Used: this.getUtilizationUsedColor(this.config.gauge.percent, this.config.gauge.thresholds),
      Available: this.chartDefaults.getDefaultDonutColors().pattern[1]  // grey
    };
  }

  private getUtilizationUsedColor(used: number, thresholds: any) {
    let threshold: string = 'none';

    let thresholdColors = this.chartDefaults.getDefaultRelationshipDonutColors().pattern;
    let color = thresholdColors[0];      // default blue
    let errorColor = thresholdColors[1]; // red
    let warnColor = thresholdColors[2];  // orange
    let okColor = thresholdColors[3];    // green

    if (thresholds) {
      threshold = 'ok';
      color = okColor;
      if (used >= thresholds.error) {
        threshold = 'error';
        color = errorColor;
      } else if (used >= thresholds.warning) {
        threshold = 'warning';
        color = warnColor;
      }
    }

    if (!this.threshold || this.threshold !== threshold) {
      this.threshold = threshold;
      this.thresholdChanged.emit(this.threshold);
    }

    return color;
  }
}
