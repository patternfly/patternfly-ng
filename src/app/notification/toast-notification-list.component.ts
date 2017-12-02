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

/**
 * Component to display a list of toast notifications
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-toast-notification-list',
  styleUrls: ['./toast-notification-list.component.less'],
  templateUrl: './toast-notification-list.component.html'
})
export class ToastNotificationListComponent implements OnInit {
  /**
   * A list of notifiactions to display
   */
  @Input() notifications: Notification[];

  /**
   * Set to true to show close button
   */
  @Input() showClose: boolean;

  /**
   * The event emitted when an action has been selected
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  /**
   * The event emitted when the close button has been selected
   */
  @Output('onCloseSelect') onCloseSelect = new EventEmitter();

  /**
   * The event emitted when the mouse hovers over and leaves a notification
   */
  @Output('onViewingChange') onViewingChange = new EventEmitter();

  /**
   * The default constructor
   */
  constructor() {
  }

  // Initialization

  /**
   * Setup component configuration upon initialization
   */
  ngOnInit(): void {
  }

  // Actions

  /**
   * Check if the component config has changed
   */
  private handleAction($event: NotificationEvent): void {
    this.onActionSelect.emit($event);
  }

  private handleClose($event: NotificationEvent): void {
    this.onCloseSelect.emit($event);
  }

  private handleViewingChange($event: NotificationEvent) {
    this.onViewingChange.emit($event);
  }
}
