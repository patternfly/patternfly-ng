import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { PaginationConfig } from '../pagination-config';
import { PaginationEvent } from '../pagination-event';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pagination-basic-example',
  templateUrl: './pagination-basic-example.component.html'
})

export class PaginationBasicExampleComponent implements OnInit {

  paginationConfig: PaginationConfig;
  actionsText: String = '';
  items: Array<any> = [];

  ngOnInit(): void {
    this.data();
    this.paginationConfig = {
      pageSize: 10,
      pageNumber: 1,
      totalItems: this.items.length
    } as PaginationConfig;
  }

  data() {
    for (let i = 1; i < 126; i++) {
      this.items.push({ id: i, status: 'Ok', value: Math.floor(Math.random() * (1000 - 1 + 1)) + 1 });
    }
  }

  handlePageSize($event: PaginationEvent) {
    this.actionsText = 'Page Size: ' + $event.pageSize + ' Selected' + '\n' + this.actionsText;
  }

  handlePageNumber($event: PaginationEvent) {
    this.actionsText = 'Page Number: ' + $event.pageNumber + ' Selected' + '\n' + this.actionsText;
  }
}
