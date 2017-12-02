import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { CardAction } from '../../card-action/card-action';
import { CardConfig } from '../card-config';
import { CardFilter } from '../../card-filter/card-filter';
import { SparklineConfig } from '../../../chart/sparkline/sparkline-config';
import { SparklineData } from '../../../chart/sparkline/sparkline-data';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'card-basic-example',
  templateUrl: './card-basic-example.component.html'
})
export class CardBasicExampleComponent implements OnInit {
  actionsText: string = '';
  chartDates: any[] = ['dates'];
  chartConfig: SparklineConfig = {
    chartHeight: 60,
    chartId: 'exampleSparkline',
    tooltipType: 'default'
  };
  chartData: SparklineData = {
    dataAvailable: true,
    total: 100,
    xData: this.chartDates,
    yData: ['used', 10, 20, 30, 20, 30, 10, 14, 20, 25, 68, 54, 56, 78, 56, 67, 88, 76, 65, 87, 76]
  };
  config: CardConfig;

  constructor() {
  }

  ngOnInit(): void {
    this.config = {
      action: {
        hypertext: 'View All Events',
        iconStyleClass: 'fa fa-flag'
      },
      filters: [{
        title: 'Last 30 Days',
        value: '30'
      }, {
        default: true,
        title: 'Last 15 Days',
        value: '15'
      }, {
        title: 'Today',
        value: 'today'
      }],
      title: 'Cluster Utilization',
    } as CardConfig;

    let today = new Date();
    for (let d = 20 - 1; d >= 0; d--) {
      this.chartDates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
    }
  }

  // Actions

  handleActionSelect($event: CardAction): void {
    this.actionsText = $event.hypertext + ' selected\r\n' + this.actionsText;
  }

  handleFilterSelect($event: CardFilter): void {
    this.actionsText = $event.title + ' selected\r\n' + this.actionsText;
  }
}
