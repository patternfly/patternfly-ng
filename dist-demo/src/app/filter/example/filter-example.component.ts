import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'filter-example',
  templateUrl: './filter-example.component.html'
})
export class FilterExampleComponent implements OnInit {
  activeTab: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }

  // Actions

  tabSelected($event: TabDirective): void {
    this.activeTab = $event.heading;
  }
}
