import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { Notification } from './notification';
import { NotificationEvent } from './notification-event';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-toast-notification-list',
  styleUrls: ['./toast-notification-list.component.less'],
  templateUrl: './toast-notification-list.component.html'
})
export class ToastNotificationListComponent implements OnInit {
  @Input() notifications: Notification[];
  @Input() showClose: boolean;

  @Output('onActionSelect') onActionSelect = new EventEmitter();
  @Output('onCloseSelect') onCloseSelect = new EventEmitter();
  @Output('onViewingChange') onViewingChange = new EventEmitter();

  constructor() {
  }

  // Initialization

  ngOnInit(): void {
  }

  // Action functions

  handleAction($event: NotificationEvent): void {
    this.onActionSelect.emit($event);
  }

  handleClose($event: NotificationEvent): void {
    this.onCloseSelect.emit($event);
  }

  handleViewingChange($event: NotificationEvent) {
    this.onViewingChange.emit($event);
  }
}
