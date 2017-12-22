import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { SparklineConfig } from '../sparkline-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sparkline-example',
  templateUrl: './sparkline-example.component.html'
})
export class SparklineExampleComponent implements OnInit {
  dates: any[] = ['dates'];
  chartData: any = {
    dataAvailable: true,
    total: 100,
    xData: this.dates,
    yData: ['used', 10, 20, 30, 20, 30, 10, 14, 20, 25, 68, 54, 56, 78, 56, 67, 88, 76, 65, 87, 76]
  };
  config: SparklineConfig = {
    chartId: 'exampleSparkline',
    chartHeight: 60,
    tooltipType: 'default'
  };

  constructor() {
  }

  ngOnInit(): void {
    let today = new Date();
    for (let d = 20 - 1; d >= 0; d--) {
      this.dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
    }
  }

  addDataPoint(): void {
    this.chartData.xData.push(new Date(
      this.chartData.xData[this.chartData.xData.length - 1].getTime() + (24 * 60 * 60 * 1000)));
    this.chartData.yData.push(Math.round(Math.random() * 100));
  }
}
