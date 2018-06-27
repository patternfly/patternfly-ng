import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { UtilizationDonutChartConfig } from '../utilization-donut-chart-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'utilization-donut-example',
  templateUrl: './utilization-donut-chart-example.component.html'
})
export class UtilizationDonutChartExampleComponent implements OnInit {
  config: UtilizationDonutChartConfig = {
    chartId: 'exampleUtilizationDonut',
    data: {
      onclick: (data: any, element: any) => {
        alert('You clicked on donut arc: ' + data.id);
      }
    },
    centerLabelFormat: 'used',
    outerLabelAlignment: 'right',
    thresholds: {'warning': 60, 'error': 80},
    total: 100,
    units: 'GB',
    used: 10
  };

  currentThreshold: string = 'none';

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.config.used = Number(this.config.used) + 10;
      if (this.config.used > 100) {
        this.config.used = 10;
      }
    }, 1000);
  }

  thresholdChanged(newThreshold: any): void {
    this.currentThreshold = newThreshold;
  }

  setCenterLabelFn(): void {
    this.config.centerLabelFn = () => {
      return  {
        title: this.config.used + ' Pods',
        subTitle: 'used, out of ' + this.config.total
      };
    };
  }

  clearCenterLabelFn(): void {
    this.config.centerLabelFn = undefined;
  }
}
