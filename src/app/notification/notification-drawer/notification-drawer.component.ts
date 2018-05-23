import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { NotificaitonGroup } from '../notification-group';

import { filter, get, size } from 'lodash';

/**
 * Notification drawer component
 *
 * This provides a common mechanism to handle how the notification drawer should look and behave without mandating
 * the look of the notification group heading or notification body.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-notification-drawer',
  templateUrl: './notification-drawer.component.html'
})
export class NotificationDrawerComponent implements OnInit {
  /**
   * Flag if the drawer can be expanded. Optional, default: false
   */
  @Input() allowExpand: boolean = false;

  /**
   * Flag if the drawer is expanded (only valid if allowExpand is true). Optional, default: false
   */
  @Input() expanded: boolean = false;

  /**
   * Template for the heading area for each notification group,
   *  access the group via notificationGroup
   */
  @Input() headingTemplate: TemplateRef<any>;

  /**
   * Flag if the drawer is currently hidden
   */
  @Input() hidden: boolean;

  /**
   * Text to show when there are no notifications. Optional.
   */
  @Input() noNotificationsText: string;

  /**
   * Template for the notification body for each notification,
   * access the notification via notification
   */
  @Input() notificationBodyTemplate: TemplateRef<any>;

  /**
   * Template for the notification footer for each notification,
   * access the notification via notification
   */
  @Input() notificationFooterTemplate: TemplateRef<any>;

  /**
   * Collection notification groups to add to the drawer. Alternatively, a single group object
   * can be given if categorization is not used.
   */
  @Input() notificationGroups: NotificaitonGroup[];

  /**
   * Optional field from the notifications to use to track by in the notifications listing ($index used otherwise).
   */
  @Input() notificationTrackField: string;

  /**
   * Flag if the mark all read button should be shown, optional, default is false
   */
  @Input() showMarkAllRead: boolean = false;

  /**
   * Flag if the clear all button should be shown, optional, default is false
   */
  @Input() showClearAll: boolean;

  /**
   * Boolean flag if size of group less 2
   */
  @Input() singleGroup: boolean;

  /**
   * Template for the sub-heading area for each notification group,
   * access the group via notificationGroup
   */
  @Input() subHeadingTemplate: TemplateRef<any>;

  /**
   * Title to display for the drawer (leaving this blank will remove the provided expand capability)
   */
  @Input() title: string;

  /**
   * Template for the title area for the notification drawer, use this
   * to customize the drawer title area
   */
  @Input() titleTemplate: TemplateRef<any>;

  /**
   * Event emitter when close icon clicked
   */
  @Output('close') close = new EventEmitter<boolean>();

  /**
   * Event emitter when mark all button clicked
   */
  @Output('unreadNotifications') unreadNotifications = new EventEmitter<boolean>();

  /**
   * A config containing properties for empty state when no notification are available
   */
  private emptyStateConfig?: EmptyStateConfig;

  /**
   * count read count
   */
  private markreadCount: number;

  /**
   * count unread notifications
   */
  private unreadCount: number;

  // Initialization

  /**
   * The default constructor
   */
  constructor() {}

  /**
   * Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.collapseOpenGroups();
    this.singleGroup = size(this.notificationGroups) < 2;
    this.markreadCount = 0;
    this.setEmptyConfig();
    this.readCountConfig();
  }

  // Actions

  /**
   *  Return boolean if group has notifications
   *  @param group
   */
  hasNotifications(group: NotificaitonGroup[]): boolean {
    return size(get(group, 'notifications')) > 0;
  }

  /**
   *  Return boolean if group has unread notifications
   *  @param group
   */
  hasUnread(group: NotificaitonGroup): boolean {
    return size(filter(get(group, 'notifications'), { 'isViewing': false })) > 0;
  }

  /** 
   * method for the close button, emits event with clicked over close icon
   *  
   */
  onClose(): void {
    this.hidden = true;
    this.close.emit(this.hidden);
  }

  /**
   * Method for the mark all read button (Optional)
   * @param group 
   */
  onMarkAllRead(group: NotificaitonGroup): void {
    group.notifications.forEach(n => n.isViewing = true);
    this.updateReadCount();
  }

  /**
   *  Method for the clear all button (Optional)
   *  @param group
   */
  onClearAll(group: NotificaitonGroup): void {
    group.notifications = null;
    group.subHeading = '0 New Events';
  }

  /**
   *  Toggle to show / hide drawer
   *  @param group
   */
  toggleCollapse(group: NotificaitonGroup): void {
    if (group.open) {
      group.open = false;
    } else {
      this.collapseOpenGroups();
      group.open = true;
    }
  }

  /**
   * Toggle to expand the drawer
   */
  toggleExpandDrawer(): void {
    if (this.allowExpand)
      this.expanded = !this.expanded;
  }

  // Private

  /**
   * Collapse panel for all groups
   */
  private collapseOpenGroups(): void {
    this.notificationGroups.forEach(grp => grp.open = false);
  }

  /**
   * Emit event during the inital load based on total unread notification
   */
  private readCountConfig(): void {
    this.unreadCount = this.totalUnreadNotifications(this.notificationGroups);
    if (this.unreadCount > 0) {
      this.unreadNotifications.emit(true);
    } else {
      this.unreadNotifications.emit(false);
    }
  }

  /**
   * Empty config setup
   */
  private setEmptyConfig(): void {
    this.emptyStateConfig = {
      iconStyleClass: 'pficon-info',
      title: this.noNotificationsText || this.noNotificationsText || 'There are no notifications to display.'
    };
  }

  /**
   * Total number of unread notifications
   * @param groups 
   */
  private totalUnreadNotifications(groups: NotificaitonGroup[]): number {
    return size(filter(
      groups.map(g => filter(get(g, 'notifications'), { 'isViewing': false }).length > 0),
      o => { return o === true; }));
  }

  /**
   * Emit event when no unread notifications are remains
   */
  private updateReadCount(): void {
    this.markreadCount = this.markreadCount + 1;
    if (this.markreadCount === this.unreadCount) {
      this.unreadNotifications.emit(false);
    }
  }
}



