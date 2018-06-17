import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { clone } from 'lodash';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sort-array-example',
  templateUrl: './sort-array-example.component.html'
})
export class SortArrayExampleComponent implements OnInit {
  items1: any[];
  items2: any[];
  items3: any[];

  constructor() {
  }

  ngOnInit(): void {
    this.items1 = [{
      name: 'Fred Flintstone',
      address: '20 Dinosaur Way',
      city: 'Bedrock',
      state: 'Washingstone'
    }, {
      name: 'John Smith',
      address: '415 East Main Street',
      city: 'Norfolk',
      state: 'Virginia',
      pin: true
    }, {
      name: 'Frank Livingston',
      address: '234 Elm Street',
      city: 'Pittsburgh',
      state: 'Pennsylvania'
    }, {
      name: 'Linda McGovern',
      address: '22 Oak Street',
      city: 'Denver',
      state: 'Colorado',
      pin: true
    }, {
      name: 'Jim Brown',
      address: '72 Bourbon Way',
      city: 'Nashville',
      state: 'Tennessee'
    }, {
      name: 'Holly Nichols',
      address: '21 Jump Street',
      city: 'Hollywood',
      state: 'California',
      pin: true
    }, {
      name: 'Marie Edwards',
      address: '17 Cross Street',
      city: 'Boston',
      state: 'Massachusetts'
    }, {
      name: 'Pat Thomas',
      address: '50 Second Street',
      city: 'New York',
      state: 'New York'
    }];
    this.items2 = clone(this.items1);
    this.items3 = clone(this.items1);
  }
}
