import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../models/action';
import { Notification } from './notification';
import { NotificationEvent } from './notification-event';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-toast-notification',
  styleUrls: ['./toast-notification.component.less'],
  templateUrl: './toast-notification.component.html'
})
export class ToastNotificationComponent implements OnInit {
  @Input() header: string;
  @Input() message: string;
  @Input() moreActions: Action[];
  @Input() notification: Notification;
  @Input() primaryAction: Action;
  @Input() showClose: boolean;
  @Input() type: string;

  @Output('onActionSelect') onActionSelect = new EventEmitter();
  @Output('onCloseSelect') onCloseSelect = new EventEmitter();
  @Output('onViewingChange') onViewingChange = new EventEmitter();

  showCloseButton: boolean = false;

  constructor() {
  }

  // Initialization

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.showCloseButton = (this.showClose === true)
        && (this.moreActions === undefined
        || this.moreActions.length === 0);
  }

  // Action functions

  handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit({
        action: action,
        notification: this.notification
      } as NotificationEvent);
    }
  }

  handleClose($event: MouseEvent): void {
    this.onCloseSelect.emit({notification: this.notification} as NotificationEvent);
  }

  handleEnter($event: MouseEvent): void {
    this.onViewingChange.emit({
      notification: this.notification,
      isViewing: true
    } as NotificationEvent);
  }

  handleLeave($event: MouseEvent): void {
    this.onViewingChange.emit({
      notification: this.notification,
      isViewing: false
    } as NotificationEvent);
  }
}
