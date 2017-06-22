import { Injectable } from '@angular/core';

import { Action } from '../models/action';
import { Notification } from './notification';
import { NotificationType } from './notification-type';

/**
 * Notification service used to notify user about important events in the application.
 *
 * ## Configuring the service
 *
 * You can configure the service with: setDelay, setVerbose and setPersist.
 *
 * ### Notifications.setDelay
 * Set the delay after which the notification is dismissed. The argument of this method expects miliseconds. Default
 * delay is 8000 ms.
 *
 * ### Notifications.setVerbose
 * Set the verbose mode to on (default) or off. During the verbose mode, each notification is printed in the console.
 *
 * ### Notifications.setPersist
 * Sets persist option for particular modes. Notification with persistent mode won't be dismissed after delay, but has
 * to be closed manually with the close button. By default, the "error" and "httpError" modes are set to persistent.
 * The input is an object in format {mode: persistValue}.
 */
@Injectable()
export class NotificationService {

  // time (in ms) the notifications are shown
  delay: number = 8000;
  modes: any = {};
  notifications: any = {};
  persist: any = {'error': true, 'httpError': true};
  verbose: boolean = false;

  constructor() {
    this.notifications.data = [] as Notification[];
    this.modes = [
      {info: { type: NotificationType.INFO, header: 'Info!', log: 'info'}},
      {success: { type: NotificationType.SUCCESS, header: 'Success!', log: 'info'}},
      {error: { type: NotificationType.DANGER, header: 'Error!', log: 'error'}},
      {warn: { type: NotificationType.WARNING, header: 'Warning!', log: 'warn'}}
    ];
    this.modes.forEach((mode: any, index: number) => {
      this.notifications[index] = this.createNotifyMethod(index);
    });
  }

  private createNotifyMethod(index: number): any {
    return (message: string, header: string, persistent: boolean, primaryAction: Action, moreActions: Action[]) => {
      if (header != undefined) {
        header = this.modes[index].header;
      }
      if (persistent != undefined) {
        persistent = this.persist[index];
      }
      this.notifications.message(this.modes[index].type, header, message, persistent, primaryAction, moreActions);
      if (this.verbose) {
        console.log(message);
      }
    };
  }

  getNotifications(): Notification[] {
    return this.notifications.data;
  }

  httpError(message: string, httpResponse: any): void {
    message += ' (' + (httpResponse.data.message || httpResponse.data.cause
        || httpResponse.data.cause || httpResponse.data.errorMessage) + ')';
    this.message('danger', 'Error!', message, this.persist.httpError, null, null);
    if (this.verbose) {
      console.log(message);
    }
  }

  message(type: string, header: string, message: string, isPersistent: boolean,
          primaryAction: Action, moreActions: Action[]): void {
    let notification = {
      header: header,
      isPersistent: isPersistent,
      isViewing: false,
      message : message,
      moreActions: moreActions,
      primaryAction: primaryAction,
      showClose: false,
      type: type,
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

  remove(notification: Notification): void {
    var index = this.notifications.data.indexOf(notification);
    if (index !== -1) {
      this.removeIndex(index);
    }
  }

  removeIndex(index: number): void {
    this.notifications.data.splice(index, 1);
  }

  setDelay(delay: number): void {
    this.delay = delay;
  }

  setPersist = function (persist: boolean): void {
    this.persist = persist;
  }

  setVerbose(verbose: boolean): void {
    this.verbose = verbose;
  }

  setViewing(notification: Notification, isViewing: boolean): void {
    notification.isViewing = isViewing;
    if (isViewing !== true && notification.visible !== true) {
      this.remove(notification);
    }
  }
}
