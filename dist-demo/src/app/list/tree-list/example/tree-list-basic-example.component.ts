import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { TreeNode } from 'angular-tree-component';

import { cloneDeep } from 'lodash';

import { Action } from '../../../action/action';
import { ActionConfig } from '../../../action/action-config';
import { EmptyStateConfig } from '../../../empty-state/empty-state-config';
import { ListEvent } from '../../list-event';
import { TreeListComponent } from '../tree-list.component';
import { TreeListConfig } from '../tree-list-config';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'tree-list-basic-example',
  templateUrl: './tree-list-basic-example.component.html'
})
export class TreeListBasicExampleComponent implements OnInit {
  actionConfig: ActionConfig;
  actionsText: string = '';
  allItems: any[];
  emptyStateConfig: EmptyStateConfig;
  lazyChild: any[];
  items: any[];
  itemsAvailable: boolean = true;
  selectType: string = 'checkbox';
  treeListConfig: TreeListConfig;

  constructor() {
  }

  ngOnInit(): void {
    this.allItems = [{
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
    }, {
      name: 'Lazy loaded children',
      address: 'ABC Street',
      city: 'Westford',
      state: 'Massachusetts',
      typeIcon: 'fa-rocket',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8,
      hasChildren: true
    }];
    this.items = cloneDeep(this.allItems);

    this.lazyChild = [{
      name: 'Lazy child',
      address: 'ABC Street',
      city: 'Westford',
      state: 'Massachusetts',
      typeIcon: 'fa-rocket',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8
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
        hypertext: 'Tree List example',
        text: 'For more information please see the',
        url: '#/treelist'
      }
    } as EmptyStateConfig;

    this.treeListConfig = {
      dblClick: false,
      emptyStateConfig: this.emptyStateConfig,
      multiSelect: false,
      selectItems: false,
      selectionMatchProp: 'name',
      showCheckbox: true,
      showRadioButton: false,
      treeOptions: {
        allowDrag: false,
        isExpandedField: 'expanded',
        getChildren: this.lazyLoadChildren.bind(this)
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

  handleSelectionChange($event: ListEvent): void {
    this.actionsText = $event.selectedItems.length + ' items selected\r\n' + this.actionsText;
  }

  handleClick($event: ListEvent): void {
    this.actionsText = $event.item.name + ' clicked\r\n' + this.actionsText;
  }

  handleDblClick($event: ListEvent): void {
    this.actionsText = $event.item.name + ' double clicked\r\n' + this.actionsText;
  }

  // Tree

  addNode(treeList: TreeListComponent): void {
    let item = cloneDeep(this.lazyChild[0]);
    item.name = item.name + ':' + this.items[0].children.length;
    this.items[0].children.push(item);
    treeList.selectItem(item, true);
    treeList.update();
  }

  lazyLoadChildren(node: TreeNode): any {
    return new Promise((resolve: any, reject: any) => {
      setTimeout(() => resolve(this.lazyChild.map((c) => {
        return (<any>Object).assign({}, c, {
          address: node.level + ' Street',
          name: 'Lazy child: ' + node.level,
          hasChildren: node.level < 5,
        });
      })), 1000);
    });
  }

  // Events

  handleMoveNode($event: any): void {
    this.actionsText = 'Event name: ' + $event.eventName +
      ', node: ' + $event.node.name +
      ', to index: ' + $event.to.index + '\n' + this.actionsText;
  }

  handleToggleExpanded($event: any): void {
    this.actionsText = 'Event name: ' + $event.eventName +
      ', isExpanded: ' + $event.isExpanded + '\n' + this.actionsText;
  }

  // Row selection

  updateItemsAvailable(): void {
    this.items = (this.itemsAvailable) ? cloneDeep(this.allItems) : [];
  }

  updateSelectionType(): void {
    if (this.selectType === 'checkbox') {
      this.treeListConfig.selectItems = false;
      this.treeListConfig.showCheckbox = true;
      this.treeListConfig.showRadioButton = false;
    } else if (this.selectType === 'radio') {
      this.treeListConfig.selectItems = false;
      this.treeListConfig.showCheckbox = false;
      this.treeListConfig.showRadioButton = true;
    } else if (this.selectType === 'row') {
      this.treeListConfig.selectItems = true;
      this.treeListConfig.showCheckbox = false;
      this.treeListConfig.showRadioButton = false;
    } else {
      this.treeListConfig.selectItems = false;
      this.treeListConfig.showCheckbox = false;
      this.treeListConfig.showRadioButton = false;
    }
  }
}
