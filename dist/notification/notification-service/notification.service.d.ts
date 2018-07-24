import { Observable } from 'rxjs';
import { Action } from '../../action/action';
import { Notification } from '../notification';
/**
 * Notification service used to notify user about important events in the application.
 *
 * You may configure the service with: setDelay, setVerbose and setPersist.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { NotificationServiceModule } from 'patternfly-ng/notification';
 * // Or
 * import { NotificationServiceModule } from 'patternfly-ng';
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Notification, NotificationType } from 'patternfly-ng/notification';
 * </pre></code>
 */
export declare class NotificationService {
    private delay;
    private modes;
    private notifications;
    private persist;
    private verbose;
    private _notificationsSubject;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Get all notifications
     */
    getNotifications(): Notification[];
    /**
     * Allows for interacting with a stream of notifications
     */
    readonly getNotificationsObserver: Observable<Notification[]>;
    /**
     * Generate a notification for the given HTTP Response
     *
     * @param message The notification message
     * @param httpResponse The HTTP Response
     */
    httpError(message: string, httpResponse: any): void;
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
    message(type: string, header: string, message: string, isPersistent: boolean, primaryAction: Action, moreActions: Action[]): void;
    /**
     * Remove notification
     *
     * @param notification The notification to remove
     */
    remove(notification: Notification): void;
    /**
     * Set the delay after which the notification is dismissed. The argument of this method expects miliseconds. Default
     * delay is 8000 ms.
     *
     * @param delay The delay in ms
     */
    setDelay(delay: number): void;
    /**
     * Sets persist option for particular modes. Notification with persistent mode won't be dismissed after delay, but has
     * to be closed manually with the close button. By default, the "error" and "httpError" modes are set to persistent.
     *
     * @param persist Set to true to persist notifications
     */
    setPersist(persist: boolean): void;
    /**
     * Set the verbose mode to on (default) or off. During the verbose mode, each notification is printed in the console.
     *
     * @param verbose Set to true for verbose mode
     */
    setVerbose(verbose: boolean): void;
    /**
     * Set a flag indicating user is viewing the given notification
     *
     * @param notification The notification currently being viewed
     * @param isViewing True if the notification is being viewed
     */
    setViewing(notification: Notification, isViewing: boolean): void;
    private createNotifyMethod;
    private removeIndex;
    private updateNotificationsStream;
}
