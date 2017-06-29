import { Action } from '../models/action';
import { Notification } from './notification';
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
export declare class NotificationService {
    delay: number;
    modes: any;
    notifications: any;
    persist: any;
    verbose: boolean;
    constructor();
    private createNotifyMethod(index);
    getNotifications(): Notification[];
    httpError(message: string, httpResponse: any): void;
    message(type: string, header: string, message: string, isPersistent: boolean, primaryAction: Action, moreActions: Action[]): void;
    remove(notification: Notification): void;
    removeIndex(index: number): void;
    setDelay(delay: number): void;
    setPersist: (persist: boolean) => void;
    setVerbose(verbose: boolean): void;
    setViewing(notification: Notification, isViewing: boolean): void;
}
