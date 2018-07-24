import { EventEmitter, OnInit } from '@angular/core';
import { Notification } from '../notification';
/**
 * Component to display a list of toast notifications
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ToastNotificationListModule } from 'patternfly-ng/notification';
 * // Or
 * import { ToastNotificationListModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [ToastNotificationListModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Notification, NotificationEvent, NotificationType } from 'patternfly-ng/notification';
 * </pre></code>
 */
export declare class ToastNotificationListComponent implements OnInit {
    /**
     * A list of notifiactions to display
     */
    notifications: Notification[];
    /**
     * Set to true to show close button
     */
    showClose: boolean;
    /**
     * The event emitted when an action has been selected
     */
    onActionSelect: EventEmitter<{}>;
    /**
     * The event emitted when the close button has been selected
     */
    onCloseSelect: EventEmitter<{}>;
    /**
     * The event emitted when the mouse hovers over and leaves a notification
     */
    onViewingChange: EventEmitter<{}>;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Check if the component config has changed
     */
    private handleAction;
    private handleClose;
    private handleViewingChange;
}
