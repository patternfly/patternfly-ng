import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { cloneDeep } from 'lodash';

import { DonutConfig } from '../donut-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'donut-dynamic-example',
  templateUrl: './donut-dynamic-example.component.html'
})
export class DonutDynamicExampleComponent implements OnDestroy, OnInit {
  chartData: any[] = [
    ['Cats', 2],
    ['Hamsters', 1],
    ['Fish', 3],
    ['Dogs', 2]
  ];

  largeConfig: DonutConfig = {
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

  smallConfig: DonutConfig;
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

    this.subscriptions.push(Observable
      .timer(0, 1000)
      .map(() => Math.floor(Math.random() * 5) + 1)
      .subscribe(val => {
        this.chartData[0][1] = val;
      }));

    this.subscriptions.push(Observable
      .timer(0, 5000)
      .map(() => Math.floor(Math.random() * 100) + 100)
      .subscribe(val => {
        this.smallConfig.chartHeight = val;
      }));
  }
}
