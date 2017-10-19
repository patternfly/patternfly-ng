import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NotificationType } from './notification-type';

/**
 * Inline notifications can be used to provide notifications to user that can persist on the page
 * they are also optionally dismissable by the user
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-inline-notification',
  styleUrls: [],
  templateUrl: './inline-notification.component.html'
})
export class InlineNotificationComponent {
  /**
   * The notification type (e.g., NotificationType.SUCCESS, NotificationType.INFO, etc.)
   */
  @Input() type: NotificationType;

  /**
   * The message to display within the notification
   */
  @Input() message: string;

  /**
   * The notification header
   */
  @Input() header: string;

  /**
   * Boolean to indicate whether or not notification can be dismissed
   */
  @Input() dismissable: boolean;

  /**
   * Indicates whether or not the notification is currently hidden
   */
  @Input() hidden: boolean = false;

  /**
   * The event emitted when the mouse hovers over and leaves a notification
   */
  @Output('hiddenChange') hiddenChange = new EventEmitter<boolean>();

  /**
   * The default constructor
   */
  constructor() {}

  /**
   * Function called from the view when the notification is removed
   */
  public notificationRemove(): void {
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }
}
