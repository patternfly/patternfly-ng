import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Router } from '@angular/router';

import { Action } from '../../action/action';
import { ActionConfig } from '../../action/action-config';
import { EmptyStateConfig } from '../empty-state-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'empty-state-example',
  templateUrl: './empty-state-example.component.html'
})
export class EmptyStateExampleComponent implements OnInit {
  actionConfig: ActionConfig;
  actionsText: string = '';
  emptyStateConfig: EmptyStateConfig;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
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

    this.emptyStateConfig = {
      actions: this.actionConfig,
      iconStyleClass: 'pficon-warning-triangle-o',
      info: 'This is the Empty State component. The goal of a empty state pattern is to provide a good first ' +
        'impression that helps users to achieve their goals. It should be used when a view is empty because no ' +
        'objects exists and you want to guide the user to perform specific actions.',
      helpLink: {
        hypertext: 'Empty State example',
        text: 'For more information please see the',
        url: '#/emptystate'
      },
      title: 'No Items Available'
    } as EmptyStateConfig;
  }

  // Actions

  handleAction($event: Action): void {
    this.actionsText = $event.title + '\n' + this.actionsText;
  }
}
