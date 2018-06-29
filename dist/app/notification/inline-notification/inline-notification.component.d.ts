import { EventEmitter } from '@angular/core';
import { NotificationType } from '../notification-type';
/**
 * Inline notifications can be used to provide notifications to user that can persist on the page
 * they are also optionally dismissable by the user
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { InlineNotificationModule } from 'patternfly-ng/notification';
 * // Or
 * import { InlineNotificationModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [InlineNotificationModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { NotificationType } from 'patternfly-ng/notification';
 * </pre></code>
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
