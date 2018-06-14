import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../../../action/action';
import { ActionConfig } from '../../../action/action-config';
import { TreeListConfig } from '../tree-list-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'tree-list-dnd-example',
  templateUrl: './tree-list-dnd-example.component.html'
})
export class TreeListDndExampleComponent implements OnInit {
  actionConfig: ActionConfig;
  actionsText: string = '';
  items: any[];
  treeListConfig: TreeListConfig;

  constructor() {
  }

  ngOnInit(): void {
    this.items = [{
      expanded: true,
      name: 'Fred Flintstone',
      address: '20 Dinosaur Way',
      city: 'Bedrock',
      state: 'Washingstone',
      typeIcon: 'fa-plane',
      clusterCount: 6,
      hostCount: 8,
      imageCount: 8,
      nodeCount: 10,
      children: [{
        name: 'John Smith',
        address: '415 East Main Street',
        city: 'Norfolk',
        state: 'Virginia',
        typeIcon: 'fa-magic',
        hostCount: 8,
        clusterCount: 6,
        nodeCount: 10,
        imageCount: 8,
        hasChildren: false
      }, {
        name: 'Frank Livingston',
        address: '234 Elm Street',
        city: 'Pittsburgh',
        state: 'Pennsylvania',
        typeIcon: 'fa-gamepad',
        hostCount: 8,
        clusterCount: 6,
        nodeCount: 10,
        imageCount: 8,
        hasChildren: false
      }, {
        name: 'Linda McGovern',
        address: '22 Oak Street',
        city: 'Denver',
        state: 'Colorado',
        typeIcon: 'fa-linux',
        hostCount: 8,
        clusterCount: 6,
        nodeCount: 10,
        imageCount: 8,
        hasChildren: false
      }]
    }, {
      name: 'Jim Brown',
      address: '72 Bourbon Way',
      city: 'Nashville',
      state: 'Tennessee',
      typeIcon: 'fa-briefcase',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8,
      children: [{
        name: 'Holly Nichols',
        address: '21 Jump Street',
        city: 'Hollywood',
        state: 'California',
        typeIcon: 'fa-coffee',
        hostCount: 8,
        clusterCount: 6,
        nodeCount: 10,
        imageCount: 8,
        hasChildren: false
      }, {
        name: 'Marie Edwards',
        address: '17 Cross Street',
        city: 'Boston',
        state: 'Massachusetts',
        typeIcon: 'fa-rebel',
        hostCount: 8,
        clusterCount: 6,
        nodeCount: 10,
        imageCount: 8,
        hasChildren: false
      }, {
        name: 'Pat Thomas',
        address: '50 Second Street',
        city: 'New York',
        state: 'New York',
        typeIcon: 'fa-linux',
        hostCount: 8,
        clusterCount: 6,
        nodeCount: 10,
        imageCount: 8,
        hasChildren: false
      }]
    }];

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

    this.treeListConfig = {
      treeOptions: {
        allowDrag: (node: any) => node.isRoot,
        allowDrop: (element: any, { parent, index }: any) => {
          return element.parent === parent;
        },
        isExpandedField: 'expanded'
      }
    } as TreeListConfig;
  }

  // Actions

  handleAction($event: Action, item: any): void {
    if ($event.id === 'start' && item != null) {
      item.started = true;
    }
    this.actionsText = $event.title + ' selected\r\n' + this.actionsText;
  }

  // Events

  handleMoveNode($event: any): void {
    this.actionsText = 'Event name: ' + $event.eventName +
      ', node: ' + $event.node.name +
      ', to index: ' + $event.to.index + '\n' + this.actionsText;
  }
}
