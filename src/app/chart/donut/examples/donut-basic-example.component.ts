import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { cloneDeep } from 'lodash';

import { DonutConfig } from '../donut-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'donut-basic-example',
  templateUrl: './donut-basic-example.component.html'
})
export class DonutBasicExampleComponent implements OnInit {
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

  constructor() {
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
  }
}
