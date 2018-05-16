import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { ChartDefaults } from '../../chart-defaults';
import { DonutChartBaseComponent } from '../donut-chart-base.component';
import { UtilizationDonutChartConfig } from './utilization-donut-chart-config';
import { WindowReference } from '../../../utilities/window.reference';

/**
 * Donut Utilization chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <br/><code>require('patternfly/dist/js/patternfly-settings');</code>
 *
 * Usage:
 * <br/><code>import { UtilizationDonutChartModule } from 'patternfly-ng/chart';</code>
 *
 * Or:
 * <br/><code>import { UtilizationDonutChartModule } from 'patternfly-ng';</code>
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-utilization-donut-chart',
  templateUrl: './utilization-donut-chart.component.html'
})
export class UtilizationDonutChartComponent extends DonutChartBaseComponent {
  /**
   * Configuration object containing details about how to render the utilization chart
   */
  @Input() config: UtilizationDonutChartConfig;

  /**
   * Event emitted when the Used amount passes a user defined threshold
   * @type {EventEmitter}
   */
  @Output() thresholdChanged: EventEmitter<any> = new EventEmitter();

  private threshold: string;

  /**
   * Default constructor
   */
  constructor(protected chartDefaults: ChartDefaults, protected windowRef: WindowReference) {
    super(chartDefaults, windowRef);
  }

  /**
   * Returns an object containing center label properties
   * @returns {any}
   */
  getCenterLabelText(): any {
    // Public for testing

    this.updateMetrics();
    const units: string = this.config.units;
    const available: number = this.config.available;
    const total: number = this.config.total;
    const percent: number = this.config.percent;
    const used: number = this.config.used;
    const labelFormat: string = this.config.centerLabelFormat;

    let centerLabelText: any = {};

    if (this.config.centerLabelFn) {
      let labelText: any = this.config.centerLabelFn();
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
   * get C3 chart data from config properties
   */
  protected getChartData(): any {
    this.updateMetrics();
    return {
      columns: [
        ['Used', this.config.used],
        ['Available', this.config.available]
      ],
      colors: this.getUtilizationColors(),
      groups: [
        ['used', 'available']
      ]
    };
  }

  private updateMetrics(): any {
    this.config.available = this.config.total - this.config.used;
    this.config.percent = Math.round(this.config.used / this.config.total * 100.0);
  }

  private getUtilizationColors(): any {
    return {
      Used: this.getUtilizationUsedColor(this.config.percent, this.config.thresholds),
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
