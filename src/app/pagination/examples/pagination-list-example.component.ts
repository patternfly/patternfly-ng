import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../../action/action';
import { ActionConfig } from '../../action/action-config';
import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { ListComponent } from "../../list/basic-list/list.component";
import { ListEvent } from '../../list/list-event';
import { ListConfig } from '../../list/basic-list/list-config';
import { PaginationConfig } from "../pagination-config";

import { cloneDeep, isEqual } from 'lodash';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pagination-list-example',
  templateUrl: './pagination-list-example.component.html'
})
export class PaginationListExampleComponent implements OnInit {
  actionsText: string = '';
  allItems: any[];
  emptyStateConfig: EmptyStateConfig;
  items: any[];
  itemsAvailable: boolean = true;
  listConfig: ListConfig;
  selectType: string = 'checkbox';
  paginationConfig: PaginationConfig;
  prevConfig: PaginationConfig


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

    this.emptyStateConfig = {
      actions: {
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
      } as ActionConfig,
      iconStyleClass: 'pficon-warning-triangle-o',
      title: 'No Items Available',
      info: 'This is the Empty State component. The goal of a empty state pattern is to provide a good first ' +
      'impression that helps users to achieve their goals. It should be used when a list is empty because no ' +
      'objects exists and you want to guide the user to perform specific actions.',
      helpLink: {
        hypertext: 'List example',
        text: 'For more information please see the',
        url: '#/list'
      }
    } as EmptyStateConfig;

    this.listConfig = {
      dblClick: false,
      emptyStateConfig: this.emptyStateConfig,
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
    this.items = cloneDeep(this.allItems.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize, this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize));
  }

  ngDoCheck(): void {
    if(!isEqual(this.paginationConfig, this.prevConfig)){
      this.checkPaginationConfig();
    }
  }

  /**
   * Check if Pagination config is changed
   */
  checkPaginationConfig(){
    this.items = cloneDeep(this.allItems.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize, this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize));
    this.prevConfig = cloneDeep(this.paginationConfig);
  }

  /**
   * Get the ActionConfig properties for each row
   *
   * @param item The current row item
   * @param actionButtonTemplate {TemplateRef} Custom button template
   * @param startButtonTemplate {TemplateRef} Custom button template
   * @returns {ActionConfig}
   */
  getActionConfig(item: any, actionButtonTemplate: TemplateRef<any>,
    startButtonTemplate: TemplateRef<any>): ActionConfig {
    let actionConfig = {
      primaryActions: [{
        id: 'start',
        styleClass: 'btn-primary',
        title: 'Start',
        tooltip: 'Start the server',
        template: startButtonTemplate
      }, {
        id: 'action1',
        title: 'Action 1',
        tooltip: 'Perform an action'
      }, {
        id: 'action2',
        title: 'Action 2',
        tooltip: 'Do something else'
      }, {
        id: 'action3',
        title: 'Action 3',
        tooltip: 'Do something special',
        template: actionButtonTemplate
      }],
      moreActions: [{
        id: 'moreActions1',
        title: 'Action',
        tooltip: 'Perform an action'
      }, {
        id: 'moreActions2',
        title: 'Another Action',
        tooltip: 'Do something else'
      }, {
        disabled: true,
        id: 'moreActions3',
        title: 'Disabled Action',
        tooltip: 'Unavailable action',
      }, {
        id: 'moreActions4',
        title: 'Something Else',
        tooltip: 'Do something special'
      }, {
        id: 'moreActions5',
        title: '',
        separator: true
      }, {
        id: 'moreActions6',
        title: 'Grouped Action 1',
        tooltip: 'Do something'
      }, {
        id: 'moreActions7',
        title: 'Grouped Action 2',
        tooltip: 'Do something similar'
      }],
      moreActionsDisabled: false,
      moreActionsVisible: true
    } as ActionConfig;

    // Set button disabled
    if (item.started === true) {
      actionConfig.primaryActions[0].disabled = true;
    }

    // Set custom properties for row
    if (item.name === 'John Smith') {
      actionConfig.moreActionsStyleClass = 'red'; // Set kebab option text red
      actionConfig.primaryActions[1].visible = false; // Hide first button
      actionConfig.primaryActions[2].disabled = true; // Set last button disabled
      actionConfig.primaryActions[3].styleClass = 'red'; // Set last button text red
      actionConfig.moreActions[0].visible = false; // Hide first kebab option
    }

    // Hide kebab
    if (item.name === 'Frank Livingston') {
      actionConfig.moreActionsVisible = false;
    }
    return actionConfig;
  }

  // Actions

  handleAction($event: Action, item: any): void {
    if ($event.id === 'start') {
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

  handleDblClick($event: ListEvent): void {
    this.actionsText = $event.item.name + ' double clicked\r\n' + this.actionsText;
  }

  handlePageSize(event) {
    this.actionsText = "Page Size: " + event.pageSize + " Selected" + "\n" + this.actionsText;
  }

  handlePageNumber(event) {
    this.actionsText = "Page Number: " + event.pageNumber + " Selected" + "\n" + this.actionsText;
  }

  // Row selection

  updateItemsAvailable(): void {
    this.items = (this.itemsAvailable) ? cloneDeep(this.allItems) : [];
  }

  updateSelectionType(): void {
    if (this.selectType === 'checkbox') {
      this.listConfig.selectItems = false;
      this.listConfig.showCheckbox = true;
    } else if (this.selectType === 'row') {
      this.listConfig.selectItems = true;
      this.listConfig.showCheckbox = false;
    } else {
      this.listConfig.selectItems = false;
      this.listConfig.showCheckbox = false;
    }
  }
}
