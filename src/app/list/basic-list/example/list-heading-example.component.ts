import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../../../action/action';
import { ActionConfig } from '../../../action/action-config';
import { ListEvent } from '../../list-event';
import { ListConfig } from '../list-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'list-heading-example',
  styleUrls: ['./list-heading-example.component.less'],
  templateUrl: './list-heading-example.component.html'
})
export class ListHeadingExampleComponent implements OnInit {
  actionConfig: ActionConfig;
  actionsText: string = '';
  allItems: any[];
  items: any[];
  listConfig: ListConfig;
  selectType: string = 'checkbox';

  constructor() {
  }

  ngOnInit(): void {
    this.allItems = [{
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

    this.actionConfig = {
      primaryActions: [{
        id: 'start',
        styleClass: 'btn-primary',
        title: 'Start',
        tooltip: 'Start the server'
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
        tooltip: 'Do something special'
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

    this.listConfig = {
      dblClick: false,
      multiSelect: false,
      selectItems: false,
      selectionMatchProp: 'name',
      showCheckbox: true,
      showRadioButton: false,
      useExpandItems: false
    } as ListConfig;
  }

  ngDoCheck(): void {
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

  handleDblClick($event: ListEvent): void {
    this.actionsText = $event.item.name + ' double clicked\r\n' + this.actionsText;
  }

  // Row selection

  updateSelectionType(): void {
    if (this.selectType === 'checkbox') {
      this.listConfig.selectItems = false;
      this.listConfig.showCheckbox = true;
      this.listConfig.showRadioButton = false;
    } else if (this.selectType === 'radio') {
      this.listConfig.selectItems = false;
      this.listConfig.showCheckbox = false;
      this.listConfig.showRadioButton = true;
    } else if (this.selectType === 'row') {
      this.listConfig.selectItems = true;
      this.listConfig.showCheckbox = false;
      this.listConfig.showRadioButton = false;
    } else {
      this.listConfig.selectItems = false;
      this.listConfig.showCheckbox = false;
      this.listConfig.showRadioButton = false;
    }
  }
}
