import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { NotificaitonGroup } from '../notification-group';
/**
 * Component for rendering a notification drawer. This provides a common mechanism to handle how the
 * notification drawer should look and behave without mandating
 * the look of the notification group heading or notification body.
 *
 */
export declare class NotificationDrawerComponent implements OnInit {
    /**
     * A config containing properties for empty state when no notification are available
     */
    emptyStateConfig?: EmptyStateConfig;
    /**
     * Flag if the drawer is currently hidden
     */
    hidden: boolean;
    /**
     * Flag if the drawer can be expanded. Optional, default: false
     */
    allowExpand: boolean;
    /**
     * Flag if the drawer is expanded (only valid if allowExpand is true). Optional, default: false
     */
    expanded: boolean;
    /**
     * Title to display for the drawer (leaving this blank will remove the provided expand capability)
     */
    title: string;
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
     * Template for the title area for the notification drawer, use this
     * to customize the drawer title area
     */
    titleTemplate: TemplateRef<any>;
    /**
     * Template for the heading area for each notification group,
     *  access the group via notificationGroup
     */
    headingTemplate: TemplateRef<any>;
    /**
     * Template for the sub-heading area for each notification group,
     * access the group via notificationGroup
     */
    subHeadingTemplate: TemplateRef<any>;
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
     * Text to show when there are no notifications. Optional.
     */
    noNotificationsText: string;
    /**
     * Boolean flag if size of group less 2
     */
    singleGroup: boolean;
    /**
     * Event emitter when close icon clicked
     */
    close: EventEmitter<boolean>;
    /**
     * Event emitter when mark all button clicked
     */
    unreadNotifications: EventEmitter<boolean>;
    /**
     * count unread notifications
     */
    private unreadCount;
    /**
     * count read count
     */
    private markreadCount;
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
     * Toggle to expand the drawer
     */
    toggleExpandDrawer(): void;
    /**
     *  Return boolean if group has unread notifications
     *  @param group
     */
    hasUnread(group: NotificaitonGroup): boolean;
    /**
     *  Return boolean if group has notifications
     *  @param group
     */
    hasNotifications(group: NotificaitonGroup[]): boolean;
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
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Collapse panel for all groups
     */
    private collapseOpenGroups();
    /**
     * Emit event during the inital load based on total unread notification
     */
    private readCountConfig();
    /**
     * Empty config setup
     */
    private setEmptyConfig();
    /**
     * Total number of unread notifications
     * @param groups
     */
    private totalUnreadNotifications(groups);
    /**
     * Emit event when no unread notifications are remains
     */
    private updateReadCount();
}
