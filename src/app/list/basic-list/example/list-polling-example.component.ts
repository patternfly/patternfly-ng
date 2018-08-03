import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { cloneDeep } from 'lodash';

import { Action } from '../../../action/action';
import { ActionConfig } from '../../../action/action-config';
import { EmptyStateConfig } from '../../../empty-state/empty-state-config';
import { ListEvent } from '../../list-event';
import { ListConfig } from '../list-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'list-polling-example',
  templateUrl: './list-polling-example.component.html'
})
export class ListPollingExampleComponent implements OnInit {
  actionsText: string = '';
  allItems: any[];
  emptyStateConfig: EmptyStateConfig;
  items: any[];
  itemsAvailable: boolean = true;
  listConfig: ListConfig;
  actionConfig: ActionConfig;
  selectType: string = 'checkbox';
  updateItemsInterval: number;

  constructor() {
  }

  ngOnInit(): void {
    this.allItems = [
      this.makeRandomItem(),
      this.makeRandomItem(),
      this.makeRandomItem(),
    ];
    this.allItems[0].expanded = true;
    this.items = cloneDeep(this.allItems);

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

    this.actionConfig = {
      primaryActions: [],
      moreActions: [{
        id: 'hint',
        title: 'This menu should stay open while the list updates',
        tooltip: 'This menu should stay open while the list updates'
      }],
      moreActionsDisabled: false,
      moreActionsVisible: true
    } as ActionConfig;

    this.listConfig = {
      dblClick: false,
      emptyStateConfig: this.emptyStateConfig,
      multiSelect: false,
      selectItems: false,
      selectionMatchProp: 'name',
      showCheckbox: true,
      showRadioButton: false,
      useExpandItems: true
    } as ListConfig;

    this.updateItemsInterval = <any>setInterval(() => this.updateItems(), 2500);
  }

  ngDoCheck(): void {
  }

  ngOnDestroy(): void {
    clearInterval(this.updateItemsInterval);
  }

  updateItems(): void {
    if (this.items.length < 20) {
      this.items = [...this.items, this.makeRandomItem()];
    }
  }

  resetItems(): void {
    this.items = cloneDeep(this.allItems);
  }

  makeRandomItem(): any {
    return {
      name: `Random ${getRandomArbitrary(0, 20)}`,
      address: `Some Address ${getRandomArbitrary(1, 100)}`,
      city: 'Bedrock',
      state: 'Washingstone',
      typeIcon: 'fa-plane',
      clusterCount: getRandomArbitrary(1, 6),
      hostCount: getRandomArbitrary(1, 8),
      imageCount: getRandomArbitrary(1, 8),
      nodeCount: getRandomArbitrary(1, 10)
    };
  }

  /**
   * Get the tracking id to use for each row
   *
   * @param index The current row index
   * @param item The current row item
   * @returns number
   */
  trackByIndex(index: number, item: any): any {
    return index;
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

  updateItemsAvailable(): void {
    this.items = (this.itemsAvailable) ? cloneDeep(this.allItems) : [];
  }

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

function getRandomArbitrary(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
