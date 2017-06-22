import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Router } from '@angular/router';

import { Action } from '../../models/action';
import { ActionsConfig } from '../../models/actions-config';
import { EmptyStateConfig } from '../empty-state-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'empty-state-example',
  templateUrl: './empty-state-example.component.html'
})
export class EmptyStateExampleComponent implements OnInit {
  actionsConfig: ActionsConfig;
  actionsText: string = '';
  emptyStateConfig: EmptyStateConfig;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
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
  }

  ngDoCheck(): void {
  }

  // Actions

  handleAction($event: Action): void {
    this.actionsText = $event.name + '\n' + this.actionsText;
  }
}
