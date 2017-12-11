import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../../action/action';
import { ActionConfig } from '../../action/action-config';
import { ListEvent } from '../../list/list-event';
import { ListConfig } from '../../list/basic-list/list-config';
import { PaginationConfig } from '../pagination-config';
import { PaginationEvent } from '../pagination-event';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pagination-list-example',
  templateUrl: './pagination-list-example.component.html'
})
export class PaginationListExampleComponent implements OnInit {
  actionConfig: ActionConfig;
  actionsText: string = '';
  allItems: any[];
  items: any[];
  listConfig: ListConfig;
  paginationConfig: PaginationConfig;

  constructor() {
  }

  ngOnInit(): void {
    this.allItems = [{
      id: 1,
      name: 'Fred Flintstone',
      address: '20 Dinosaur Way',
      city: 'Bedrock',
      state: 'Washingstone',
      typeIcon: 'fa-plane',
      clusterCount: 6,
      hostCount: 8,
      imageCount: 8,
      nodeCount: 10
    }, {
      id: 2,
      name: 'John Smith',
      address: '415 East Main Street',
      city: 'Norfolk',
      state: 'Virginia',
      typeIcon: 'fa-magic',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8,
      hideExpandToggle: true
    }, {
      id: 3,
      name: 'Frank Livingston',
      address: '234 Elm Street',
      city: 'Pittsburgh',
      state: 'Pennsylvania',
      typeIcon: 'fa-gamepad',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8
    }, {
      id: 4,
      name: 'Linda McGovern',
      address: '22 Oak Street',
      city: 'Denver',
      state: 'Colorado',
      typeIcon: 'fa-linux',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8
    }, {
      id: 5,
      name: 'Jim Brown',
      address: '72 Bourbon Way',
      city: 'Nashville',
      state: 'Tennessee',
      typeIcon: 'fa-briefcase',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8
    }, {
      id: 6,
      name: 'Holly Nichols',
      address: '21 Jump Street',
      city: 'Hollywood',
      state: 'California',
      typeIcon: 'fa-coffee',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8
    }, {
      id: 7,
      name: 'Marie Edwards',
      address: '17 Cross Street',
      city: 'Boston',
      state: 'Massachusetts',
      typeIcon: 'fa-rebel',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8
    }, {
      id: 8,
      name: 'Pat Thomas',
      address: '50 Second Street',
      city: 'New York',
      state: 'New York',
      typeIcon: 'fa-linux',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8
    }];

    this.actionConfig = {
      primaryActions: [{
        id: 'action1',
        title: 'Main Action',
        tooltip: 'Start the server'
      }],
      moreActions: [{
        id: 'action2',
        title: 'Secondary Action 1',
        tooltip: 'Do the first thing'
      }, {
        id: 'action3',
        title: 'Secondary Action 2',
        tooltip: 'Do something else'
      }, {
        id: 'action4',
        title: 'Secondary Action 3',
        tooltip: 'Do something special'
      }]
    } as ActionConfig;

    this.listConfig = {
      dblClick: false,
      multiSelect: false,
      selectItems: false,
      selectionMatchProp: 'name',
      showCheckbox: true,
      useExpandItems: false
    } as ListConfig;

    this.paginationConfig = {
      pageNumber: 1,
      pageSize: 3,
      pageSizeIncrements: [2, 3, 4],
      totalItems: this.allItems.length
    } as PaginationConfig;

    this.updateItems();
  }

  // Actions

  handleAction($event: Action, item: any): void {
    if ($event.id === 'start' && item !== null) {
      item.started = true;
    }
    this.actionsText = $event.title + ' selected\r\n' + this.actionsText;
  }

  handleSelectionChange($event: ListEvent): void {
    this.actionsText = $event.selectedItems.length + ' items selected\r\n' + this.actionsText;
  }

  handleClick($event: ListEvent): void {
    this.actionsText = $event.item.name + ' clicked\r\n' + this.actionsText;
  }

  handlePageSize($event: PaginationEvent) {
    this.actionsText = 'Page Size: ' + $event.pageSize + ' Selected' + '\n' + this.actionsText;
    this.updateItems();
  }

  handlePageNumber($event: PaginationEvent) {
    this.actionsText = 'Page Number: ' + $event.pageNumber + ' Selected' + '\n' + this.actionsText;
    this.updateItems();
  }

  // Pagination

  updateItems() {
    this.items = this.allItems.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize,
      this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize);
  }
}
