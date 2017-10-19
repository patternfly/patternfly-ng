import { Injectable } from '@angular/core';

import { Action } from '../action/action';
import { Notification } from './notification';
import { NotificationType } from './notification-type';

/**
 * Notification service used to notify user about important events in the application.
 *
 * You may configure the service with: setDelay, setVerbose and setPersist.
 */
@Injectable()
export class NotificationService {
  // time (in ms) the notifications are shown
  private delay: number = 8000;
  private modes: any = {};
  private notifications: any = {};
  private persist: any = { error: true, httpError: true };
  private verbose: boolean = false;

  /**
   * The default constructor
   */
  constructor() {
    this.notifications.data = [] as Notification[];
    this.modes = [
      { info: { type: NotificationType.INFO, header: 'Info!', log: 'info' } },
      {
        success: {
          type: NotificationType.SUCCESS,
          header: 'Success!',
          log: 'info'
        }
      },
      {
        error: { type: NotificationType.DANGER, header: 'Error!', log: 'error' }
      },
      {
        warn: {
          type: NotificationType.WARNING,
          header: 'Warning!',
          log: 'warn'
        }
      }
    ];
    this.modes.forEach((mode: any, index: number) => {
      this.notifications[index] = this.createNotifyMethod(index);
    });
  }

  /**
   * Get all notifications
   */
  getNotifications(): Notification[] {
    return this.notifications.data;
  }

  /**
   * Generate a notification for the given HTTP Response
   *
   * @param message The notification message
   * @param httpResponse The HTTP Response
   */
  httpError(message: string, httpResponse: any): void {
    message +=
      ' (' +
      (httpResponse.data.message ||
        httpResponse.data.cause ||
        httpResponse.data.cause ||
        httpResponse.data.errorMessage) +
      ')';
    this.message('danger', 'Error!', message, this.persist.httpError, null, null);
    if (this.verbose) {
      console.log(message);
    }
  }

  /**
   * Generate a notification message
   *
   * @param type The notification type
   * @param header The notification header
   * @param message The notification message
   * @param isPersistent True if the notification should be persistent
   * @param primaryAction The primary action for the notifiaction
   * @param moreActions More actions for the kebab
   */
  message(
    type: string,
    header: string,
    message: string,
    isPersistent: boolean,
    primaryAction: Action,
    moreActions: Action[]
  ): void {
    const notification = {
      header,
      isPersistent,
      isViewing: false,
      message,
      moreActions,
      primaryAction,
      showClose: false,
      type,
      visible: true
    } as Notification;
    this.notifications.data.push(notification);

    if (notification.isPersistent !== true) {
      notification.isViewing = false;
      setTimeout(() => {
        notification.visible = false;
        if (!notification.isViewing) {
          this.remove(notification);
        }
      }, this.delay);
    }
  }

  /**
   * Remove notification
   *
   * @param notification The notification to remove
   */
  remove(notification: Notification): void {
    const index = this.notifications.data.indexOf(notification);
    if (index !== -1) {
      this.removeIndex(index);
    }
  }

  /**
   * Set the delay after which the notification is dismissed. The argument of this method expects miliseconds. Default
   * delay is 8000 ms.
   *
   * @param delay The delay in ms
   */
  setDelay(delay: number): void {
    this.delay = delay;
  }

  /**
   * Sets persist option for particular modes. Notification with persistent mode won't be dismissed after delay, but has
   * to be closed manually with the close button. By default, the "error" and "httpError" modes are set to persistent.
   *
   * @param persist Set to true to persist notifications
   */
  setPersist = function(persist: boolean): void {
    this.persist = persist;
  };

  /**
   * Set the verbose mode to on (default) or off. During the verbose mode, each notification is printed in the console.
   *
   * @param verbose Set to true for verbose mode
   */
  setVerbose(verbose: boolean): void {
    this.verbose = verbose;
  }

  /**
   * Set a flag indicating user is viewing the given notification
   *
   * @param notification The notification currently being viewed
   * @param isViewing True if the notification is being viewed
   */
  setViewing(notification: Notification, isViewing: boolean): void {
    notification.isViewing = isViewing;
    if (isViewing !== true && notification.visible !== true) {
      this.remove(notification);
    }
  }

  // Private

  private createNotifyMethod(index: number): any {
    return (message: string, header: string, persistent: boolean, primaryAction: Action, moreActions: Action[]) => {
      if (header !== undefined) {
        header = this.modes[index].header;
      }
      if (persistent !== undefined) {
        persistent = this.persist[index];
      }
      this.notifications.message(this.modes[index].type, header, message, persistent, primaryAction, moreActions);
      if (this.verbose) {
        console.log(message);
      }
    };
  }

  private removeIndex(index: number): void {
    this.notifications.data.splice(index, 1);
  }
}
