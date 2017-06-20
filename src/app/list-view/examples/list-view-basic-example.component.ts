import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../../models/action';
import { ActionsConfig } from '../../models/actions-config';
import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { ListViewConfig } from '../list-view-config';
import { ListViewEvent } from '../list-view-event';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'list-view-basic-example',
  styleUrls: ['./list-view-basic-example.component.less'],
  templateUrl: './list-view-basic-example.component.html'
})
export class ListViewBasicExampleComponent implements OnInit {
  actionsConfig: ActionsConfig;
  actionsText: string = '';
  allItems: any[];
  // dragItem: any;
  emptyStateConfig: EmptyStateConfig;
  items: any[];
  itemsAvailable: boolean = true;
  listViewConfig: ListViewConfig;
  selectType: string = 'checkbox';
  showDisabledRows: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.allItems = [{
      // First array item used for column headings
      name: 'NAME',
      actions: 'ACTIONS',
      additionalInfo: 'ADDITOINAL INFO',
      address: 'ADDRESS'
    }, {
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
      name: 'John Smith',
      address: '415 East Main Street',
      city: 'Norfolk',
      state: 'Virginia',
      typeIcon: 'fa-magic',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8,
      hideExpandingRowToggle: true
    }, {
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
    this.items = this.allItems;

    this.actionsConfig = {
      primaryActions: [{
        id: 'action1',
        name: 'Main Action',
        title: 'Start the server'
      }],
      moreActions: [{
        id: 'action2',
        name: 'Secondary Action 1',
        title: 'Do the first thing'
      }, {
        id: 'action3',
        name: 'Secondary Action 2',
        title: 'Do something else'
      }, {
        id: 'action4',
        name: 'Secondary Action 3',
        title: 'Do something special'
      }]
    } as ActionsConfig;

    this.emptyStateConfig = {
      actions: this.actionsConfig,
      icon: 'pficon-warning-triangle-o',
      title: 'No Items Available',
      info: 'This is the Empty State component. The goal of a empty state pattern is to provide a good first ' +
        'impression that helps users to achieve their goals. It should be used when a view is empty because no ' +
        'objects exists and you want to guide the user to perform specific actions.',
      helpLink: {
        label: 'For more information please see the',
        urlLabel: 'EmptyState example',
        url: '/emptystate'
      }
    } as EmptyStateConfig;

    this.listViewConfig = {
      dblClick: false,
      dragEnabled: false,
      emptyStateConfig: this.emptyStateConfig,
      headingRow: true,
      multiSelect: false,
      selectItems: false,
      selectionMatchProp: 'name',
      showSelectBox: true,
      useExpandingRows: false
    } as ListViewConfig;
  }

  ngDoCheck(): void {
  }

  /**
   * Get the ActionConfig properties for each row
   *
   * @param item The current row item
   * @param actionButtonTemplate {TemplateRef} Custom button template
   * @param startButtonTemplate {TemplateRef} Custom button template
   * @returns {ActionsConfig}
   */
  getActionsConfig(item: any, actionButtonTemplate: TemplateRef<any>,
      startButtonTemplate: TemplateRef<any>): ActionsConfig {
    let config = {
      primaryActions: [{
        id: 'start',
        name: 'Start',
        title: 'Start the server',
        styleClass: 'btn-primary',
        template: startButtonTemplate
      }, {
        id: 'action1',
        name: 'Action 1',
        title: 'Perform an action'
      }, {
        id: 'action2',
        name: 'Action 2',
        title: 'Do something else'
      }, {
        id: 'action3',
        name: 'Action 3',
        title: 'Do something special',
        template: actionButtonTemplate
      }],
      moreActions: [{
        id: 'moreActions1',
        name: 'Action',
        title: 'Perform an action'
      }, {
        id: 'moreActions2',
        name: 'Another Action',
        title: 'Do something else'
      }, {
        disabled: true,
        id: 'moreActions3',
        name: 'Disabled Action',
        title: 'Unavailable action',
      }, {
        id: 'moreActions4',
        name: 'Something Else',
        title: ''
      }, {
        id: 'moreActions5',
        name: '',
        separator: true
      }, {
        id: 'moreActions6',
        name: 'Grouped Action 1',
        title: 'Do something'
      }, {
        id: 'moreActions7',
        name: 'Grouped Action 2',
        title: 'Do something similar'
      }],
      moreActionsDisabled: false,
      moreActionsVisible: true
    } as ActionsConfig;

    // Set button disabled
    if (item.started === true) {
      config.primaryActions[0].disabled = true;
    }

    // Set custom properties for row
    if (item.name === 'John Smith') {
      config.moreActionsStyleClass = 'red'; // Set kebab option text red
      config.primaryActions[1].visible = false; // Hide first button
      config.primaryActions[2].disabled = true; // Set last button disabled
      config.primaryActions[3].styleClass = 'red'; // Set last button text red
      config.moreActions[0].visible = false; // Hide first kebab option
    }

    // Hide kebab
    if (item.name === 'Frank Livingston') {
      config.moreActionsVisible = false;
    }
    return config;
  }

  // Actions

  handleAction($event: Action, item: any): void {
    if ($event.id === 'start') {
      item.started = true;
    }
    this.actionsText = $event.name + ' selected\r\n' + this.actionsText;
  }

  handleSelect($event: ListViewEvent): void {
    this.actionsText = $event.item.name + ' selected\r\n' + this.actionsText;
  }

  handleSelectionChange($event: ListViewEvent): void {
    this.actionsText = $event.selectedItems.length + ' items selected\r\n' + this.actionsText;
  }

  handleClick($event: ListViewEvent): void {
    this.actionsText = $event.item.name + ' clicked\r\n' + this.actionsText;
  }

  handleDblClick($event: ListViewEvent): void {
    this.actionsText = $event.item.name + ' double clicked\r\n' + this.actionsText;
  }

  handleCheckBoxChange($event: ListViewEvent): void {
    this.actionsText = $event.item.name + ' checked: ' + $event.item.selected + '\r\n' + this.actionsText;
  }

/* Not implemented
  // Drag and drop

  handleDragEnd($event: ListViewEvent): void {
    this.actionsText = 'drag end\r\n' + this.actionsText;
  }

  handleDragMoved($event: ListViewEvent): void {
    let index = -1;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === this.dragItem) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      this.items.splice(index, 1);
    }
    this.actionsText = 'drag moved\r\n' + this.actionsText;
  }

  handleDragStart($event: ListViewEvent): void {
    this.dragItem = $event.item;
    this.actionsText = $event.item.name + ': drag start\r\n' + this.actionsText;
  }
*/

  // Row selection

  updateDisabledRows(): void {
    this.items[1].disabled = this.showDisabledRows;
  }

  updateItemsAvailable(): void {
    this.items = (this.itemsAvailable) ? this.allItems : [];
  }

  updateSelectionType(): void {
    if (this.selectType === 'checkbox') {
      this.listViewConfig.selectItems = false;
      this.listViewConfig.showSelectBox = true;
    } else if (this.selectType === 'row') {
      this.listViewConfig.selectItems = true;
      this.listViewConfig.showSelectBox = false;
    } else {
      this.listViewConfig.selectItems = false;
      this.listViewConfig.showSelectBox = false;
    }
  }
}
