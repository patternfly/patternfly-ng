import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'donut-example',
  templateUrl: './donut-example.component.html'
})
export class DonutExampleComponent implements OnInit {
  public config: any = {
    chartId: 'exampleDonut',
    colors: {
      Cats: '#0088ce',
      Hamsters: '#3f9c35'
    },
    onClickFn: (data: any, element: any) => {
      alert('Clicked!');
    },
    donut: {
      title: 'Animals'
    }
  };
  public data: any = [
    ['Cats', 2],
    ['Hamsters', 2]
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.config.chartHeight = 180;
  }
}
