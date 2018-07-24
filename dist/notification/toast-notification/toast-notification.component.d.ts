import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { Action } from '../../action/action';
import { Notification } from '../notification';
/**
 * Toast notifications are used to notify users of a system occurrence. Toast notifications should be transient and stay
 * on the screen for 8 seconds, so that they do not block the information behind them for too long, but allows the user
 * to read the message. The ToastNotification component allows status, header, message, primary action and menu actions
 * for the notification. The notification can also allow the user to close the notification.
 *
 * Note: Using the kebab menu (more actions) with the close button is not currently supported. If both are specified the
 * close button will not be shown. Add a close menu item if you want to have both capabilities.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ToastNotificationModule } from 'patternfly-ng/notification';
 * // Or
 * import { ToastNotificationModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [ToastNotificationModule, BsDropdownModule.forRoot(),...],
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
export declare class ToastNotificationComponent implements DoCheck, OnInit {
    /**
     * The notification header
     */
    header: string;
    /**
     * The notification message
     */
    message: string;
    /**
     * The notification kebab actions
     */
    moreActions: Action[];
    /**
     * An object containing notifications properties
     */
    notification: Notification;
    /**
     * The primary action
     */
    primaryAction: Action;
    /**
     * Set to true to show close button
     */
    showClose: boolean;
    /**
     * The notification type (e.g., NotificationType.SUCCESS, NotificationType.INFO, etc.)
     */
    type: string;
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
    private _showCloseButton;
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
    ngDoCheck(): void;
    /**
     * Get the flag indicating that the close button should be shown
     *
     * @returns {FilterField} The flag indicating that the close button should be shown
     */
    readonly showCloseButton: boolean;
    handleEnter($event: MouseEvent): void;
    handleLeave($event: MouseEvent): void;
    private handleAction;
    private handleClose;
}
