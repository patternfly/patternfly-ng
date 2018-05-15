import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { DonutUtilizationConfig } from '../donut-utilization-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'donut-utilization-example',
  templateUrl: './donut-utilization-example.component.html'
})
export class DonutUtilizationExampleComponent implements OnInit {
  config: DonutUtilizationConfig = {
    chartId: 'exampleUtilizationDonut',
    data: {
      onclick: (data: any, element: any) => {
        alert('You clicked on donut arc: ' + data.id);
      }
    },
    gauge: {
      used: 10,
      total: 100,
      units: 'GB',
      thresholds: {'warning': 60, 'error': 80},
      centerLabelFormat: 'used',
      outerLabelAlignment: 'left',
      /*centerLabelFn: () => {  <-- setting this dynamically below
        return  {
          title: this.config.gauge.used + ' Pods',
          subTitle: 'used, out of ' + this.config.gauge.total
        };
      }*/
    }
  };

  currentThreshold: string = 'none';

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.config.gauge.used = Number(this.config.gauge.used) + 10;
      if (this.config.gauge.used > 100) {
        this.config.gauge.used = 10;
      }
    }, 1000);
  }

  thresholdChanged(newThreshold: any): void {
    this.currentThreshold = newThreshold;
  }

  setCenterLabelFn(): void {
    this.config.gauge.centerLabelFn = () => {
      return  {
        title: this.config.gauge.used + ' Pods',
        subTitle: 'used, out of ' + this.config.gauge.total
      };
    };
  }

  clearCenterLabelFn(): void {
    this.config.gauge.centerLabelFn = undefined;
  }
}
