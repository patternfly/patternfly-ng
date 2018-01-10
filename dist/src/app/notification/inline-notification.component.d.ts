import { EventEmitter } from '@angular/core';
import { NotificationType } from './notification-type';
/**
 * Inline notifications can be used to provide notifications to user that can persist on the page
 * they are also optionally dismissable by the user
 */
export declare class InlineNotificationComponent {
    /**
     * The notification type (e.g., NotificationType.SUCCESS, NotificationType.INFO, etc.)
     */
    type: NotificationType;
    /**
     * The message to display within the notification
     */
    message: string;
    /**
     * The notification header
     */
    header: string;
    /**
     * Boolean to indicate whether or not notification can be dismissed
     */
    dismissable: boolean;
    /**
     * Indicates whether or not the notification is currently hidden
     */
    hidden: boolean;
    /**
     * The event emitted when the mouse hovers over and leaves a notification
     */
    hiddenChange: EventEmitter<boolean>;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Function called from the view when the notification is removed
     */
    notificationRemove(): void;
}
