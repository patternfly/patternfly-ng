import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../../action/action';
import { ActionConfig } from '../../action/action-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'action-custom-example',
  templateUrl: './action-custom-example.component.html'
})
export class ActionCustomExampleComponent implements OnInit {
  actionConfig: ActionConfig;
  actionsText: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.actionConfig = {
      primaryActions: [{
        id: 'action1',
        title: 'Action 1',
        tooltip: 'Do the first thing'
      }, {
        id: 'action2',
        title: 'Action 2',
        tooltip: 'Do something else'
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
      }]
    } as ActionConfig;
  }

  // Actions

  doAdd(): void {
    this.actionsText = 'Add Action\n' + this.actionsText;
  }

  handleAction(action: Action): void {
    this.actionsText = action.title + '\n' + this.actionsText;
  }

  optionSelected(option: number): void {
    this.actionsText = 'Option ' + option + ' selected\n' + this.actionsText;
  }
}
