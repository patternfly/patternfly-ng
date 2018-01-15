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
  selector: 'card-trend-example',
  templateUrl: './card-trend-example.component.html'
})
export class CardTrendExampleComponent implements OnInit {
  actionsText: string = '';
  chartDates: any[] = ['dates'];
  chartConfigVirtual: SparklineConfig = {
    chartHeight: 60,
    chartId: 'virtualTrendsChart',
    tooltipType: 'default'
  };
  chartDataVirtual: SparklineData = {
    dataAvailable: true,
    total: 250,
    xData: this.chartDates,
    yData: [
      'used', '90', '20', '30', '20', '20', '10', '14', '20', '25',
      '68', '44', '56', '78', '56', '67', '88', '76', '65', '87', '76']
  };
  chartConfigPhysical: SparklineConfig = {
    chartHeight: 60,
    chartId: 'physicalTrendsChart',
    tooltipType: 'default'
  };
  chartDataPhysical: SparklineData = {
    dataAvailable: true,
    total: 250,
    xData: this.chartDates,
    yData: [
      'used', '20', '20', '35', '20', '20', '87', '14', '20', '25',
      '28', '44', '56', '78', '56', '67', '88', '76', '65', '87', '16']
  };
  chartConfigMemory: SparklineConfig = {
    chartHeight: 60,
    chartId: 'memoryTrendsChart',
    tooltipType: 'default'
  };
  chartDataMemory: SparklineData = {
    dataAvailable: true,
    total: 250,
    xData: this.chartDates,
    yData: [
      'used', '20', '20', '35', '70', '20', '87', '14', '95', '25',
      '28', '44', '56', '66', '16', '67', '88', '76', '65', '87', '56']
  };
  config: CardConfig;

  constructor() {
  }

  ngOnInit(): void {
    this.config = {
      action: {
        hypertext: 'Add New Cluster',
        iconStyleClass: 'fa fa-plus-circle'
      },
      title: 'Performance',
      titleBorder: false,
      topBorder: false,
      subTitle: 'Last 30 Days'
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
