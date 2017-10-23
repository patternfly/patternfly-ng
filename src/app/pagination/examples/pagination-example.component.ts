import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pagination-example',
  templateUrl: './pagination-example.component.html'
})
export class PaginationExampleComponent implements OnInit {
  activeTab: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  // Actions

  tabSelected($event: TabDirective): void {
    this.activeTab = $event.heading;
  }
}
