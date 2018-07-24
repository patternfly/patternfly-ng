import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { timer, Subscription } from 'rxjs';

import { cloneDeep } from 'lodash';

import { DonutChartConfig } from '../donut-chart-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'donut-chart-dynamic-example',
  templateUrl: './donut-chart-dynamic-example.component.html'
})
export class DonutChartDynamicExampleComponent implements OnDestroy, OnInit {
  chartData: any[] = [
    ['Cats', 2],
    ['Hamsters', 1],
    ['Fish', 3],
    ['Dogs', 2]
  ];

  largeConfig: DonutChartConfig = {
    chartId: 'exampleDonut',
    colors: {
      Cats: '#0088ce',     // blue
      Hamsters: '#3f9c35', // green
      Fish: '#ec7a08',     // orange
      Dogs: '#cc0000'      // red
    },
    data: {
      onclick: (data: any, element: any) => {
        alert('You clicked on donut arc: ' + data.id);
      }
    },
    donut: {
      title: 'Animals'
    },
    legend: {
      show: true
    }
  };

  smallConfig: DonutChartConfig;
  subscriptions: Subscription[] = [];

  constructor() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  ngOnInit(): void {
    this.smallConfig = cloneDeep(this.largeConfig);
    this.smallConfig.chartId = 'exampleDonut2';
    this.smallConfig.legend = {
      show: true,
      position: 'right'
    };
    this.smallConfig.centerLabel = 'Pets';
    this.smallConfig.chartHeight = 120;

    this.subscriptions.push(timer(0, 1000)
      .subscribe(() => {
        this.chartData[0][1] = Math.floor(Math.random() * 5) + 1;
      }));

    this.subscriptions.push(timer(0, 5000)
      .subscribe(() => {
        this.smallConfig.chartHeight = Math.floor(Math.random() * 100) + 100;
      }));
  }
}
