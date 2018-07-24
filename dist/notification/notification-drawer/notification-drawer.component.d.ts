import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { NotificaitonGroup } from '../notification-group';
/**
 * Notification drawer component
 *
 * This provides a common mechanism to handle how the notification drawer should look and behave without mandating
 * the look of the notification group heading or notification body.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { NotificationDrawerModule } from 'patternfly-ng/notification';
 * // Or
 * import { NotificationDrawerModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [NotificationDrawerModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Notification, NotificationGroup } from 'patternfly-ng/notification';
 * </pre></code>
 */
export declare class NotificationDrawerComponent implements OnInit {
    /**
     * Flag if the drawer can be expanded. Optional, default: false
     */
    allowExpand: boolean;
    /**
     * Flag if the drawer is expanded (only valid if allowExpand is true). Optional, default: false
     */
    expanded: boolean;
    /**
     * Template for the heading area for each notification group,
     *  access the group via notificationGroup
     */
    headingTemplate: TemplateRef<any>;
    /**
     * Flag if the drawer is currently hidden
     */
    hidden: boolean;
    /**
     * Text to show when there are no notifications. Optional.
     */
    noNotificationsText: string;
    /**
     * Template for the notification body for each notification,
     * access the notification via notification
     */
    notificationBodyTemplate: TemplateRef<any>;
    /**
     * Template for the notification footer for each notification,
     * access the notification via notification
     */
    notificationFooterTemplate: TemplateRef<any>;
    /**
     * Collection notification groups to add to the drawer. Alternatively, a single group object
     * can be given if categorization is not used.
     */
    notificationGroups: NotificaitonGroup[];
    /**
     * Optional field from the notifications to use to track by in the notifications listing ($index used otherwise).
     */
    notificationTrackField: string;
    /**
     * Flag if the mark all read button should be shown, optional, default is false
     */
    showMarkAllRead: boolean;
    /**
     * Flag if the clear all button should be shown, optional, default is false
     */
    showClearAll: boolean;
    /**
     * Boolean flag if size of group less 2
     */
    singleGroup: boolean;
    /**
     * Template for the sub-heading area for each notification group,
     * access the group via notificationGroup
     */
    subHeadingTemplate: TemplateRef<any>;
    /**
     * Title to display for the drawer (leaving this blank will remove the provided expand capability)
     */
    title: string;
    /**
     * Template for the title area for the notification drawer, use this
     * to customize the drawer title area
     */
    titleTemplate: TemplateRef<any>;
    /**
     * Event emitter when close icon clicked
     */
    close: EventEmitter<boolean>;
    /**
     * Event emitter when mark all button clicked
     */
    unreadNotifications: EventEmitter<boolean>;
    /**
     * A config containing properties for empty state when no notification are available
     */
    private emptyStateConfig?;
    /**
     * count read count
     */
    private markreadCount;
    /**
     * count unread notifications
     */
    private unreadCount;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     *  Return boolean if group has notifications
     *  @param group
     */
    hasNotifications(group: NotificaitonGroup[]): boolean;
    /**
     *  Return boolean if group has unread notifications
     *  @param group
     */
    hasUnread(group: NotificaitonGroup): boolean;
    /**
     * method for the close button, emits event with clicked over close icon
     *
     */
    onClose(): void;
    /**
     * Method for the mark all read button (Optional)
     * @param group
     */
    onMarkAllRead(group: NotificaitonGroup): void;
    /**
     *  Method for the clear all button (Optional)
     *  @param group
     */
    onClearAll(group: NotificaitonGroup): void;
    /**
     *  Toggle to show / hide drawer
     *  @param group
     */
    toggleCollapse(group: NotificaitonGroup): void;
    /**
     * Toggle to expand the drawer
     */
    toggleExpandDrawer(): void;
    /**
     * Collapse panel for all groups
     */
    private collapseOpenGroups;
    /**
     * Emit event during the inital load based on total unread notification
     */
    private readCountConfig;
    /**
     * Empty config setup
     */
    private setEmptyConfig;
    /**
     * Total number of unread notifications
     * @param groups
     */
    private totalUnreadNotifications;
    /**
     * Emit event when no unread notifications are remains
     */
    private updateReadCount;
}
