import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../../../action/action';
import { NotificationEvent } from '../../notification-event';
import { NotificationType } from '../../notification-type';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'toast-notification-example',
  templateUrl: './toast-notification-example.component.html'
})
export class ToastNotificationExampleComponent implements OnInit {
  actionText: string = '';
  header: string = 'Default Header.';
  message: string = 'Default Message.';
  moreActions: Action[];
  moreActionsDefault: Action[];
  primaryAction: Action;
  showClose: false;
  showMoreActions: boolean = false;
  type: string;
  types: string[];

  constructor() {
  }

  ngOnInit(): void {
    this.types = [
      NotificationType.SUCCESS,
      NotificationType.INFO,
      NotificationType.DANGER,
      NotificationType.WARNING
    ];
    this.type = this.types[0];

    this.primaryAction = {
      id: 'action1',
      name: '', // left empty for input
      title: 'Perform an action'
    } as Action;

    this.moreActionsDefault = [{
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
      title: 'Unavailable action'
    }, {
      id: 'moreActions4',
      name: 'Something Else',
      title: 'Do something special'
    }, {
      id: 'moreActions5',
      separator: true
    }, {
      id: 'moreActions6',
      name: 'Grouped Action 1',
      title: 'Do something'
    }, {
      id: 'moreActions7',
      name: 'Grouped Action 2',
      title: 'Do something similar'
    }] as Action[];
  }

  ngDoCheck(): void {
    if (this.showMoreActions === true) {
      this.moreActions = this.moreActionsDefault;
    } else {
      this.moreActions = undefined;
    }
  }

  // Action functions

  handleAction($event: NotificationEvent): void {
    this.actionText = $event.action.title + '\n' + this.actionText;
  }

  handleClose($event: NotificationEvent): void {
    this.actionText = 'Close' + '\n' + this.actionText;
  }

  handleType(item: string): void {
    this.type = item;
  }
}
