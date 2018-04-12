import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { NotificaitonGroup } from '../notification-group';

import { compact, filter, find, get, map, size, without } from 'lodash';
/**
 * Component for rendering a notification drawer. This provides a common mechanism to handle how the
 * notification drawer should look and behave without mandating
 * the look of the notification group heading or notification body.
 *
 *
 */

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-notification-drawer',
  templateUrl: './notification-drawer.component.html'
})

export class NotificationDrawerComponent implements OnInit {



  /**
   * A config containing properties for empty state when no notification are available
   */
  emptyStateConfig?: EmptyStateConfig;


  /**
   * Flag if the drawer is currently hidden
   */
  @Input() hidden: boolean;


  /**
   * Flag if the drawer can be expanded. Optional, default: false
   */
  @Input() allowExpand: boolean;


  /**
   * Flag if the drawer is expanded (only valid if allowExpand is true). Optional, default: false
   */
  @Input() expanded: boolean;


  /**
   * Title to display for the drawer (leaving this blank will remove the provided expand capability)
   */
  @Input() title: string;


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
   * Template src for the title area for the notification drawer, use this
   * to customize the drawer title area
   */
  @Input() titleTemplate: TemplateRef<any>;


  /**
   * Include src for the heading area for each notification group,
   *  access the group via notificationGroup
   */
  @Input() headingTemplate: TemplateRef<any>;


  /**
   * Include src for the sub-heading area for each notification group,
   * access the group via notificationGroup
   */
  @Input() subHeadingTemplate: TemplateRef<any>;



  /**
   * Template src for the notification body for each notification,
   * access the notification via notification
   */
  @Input() notificationBodyTemplate: TemplateRef<any>;


  /**
   * Template src for the notification footer for each notification,
   * access the notification via notification
   */
  @Input() notificationFooterTemplate: TemplateRef<any>;


  /**
   * Text to show when there are no notifications. Optional.
   */
  @Input() noNotificationsText: string;


  @Input() singleGroup: boolean;



  @Output('close') close = new EventEmitter<boolean>();

  @Output('unreadNotifications') unreadNotifications = new EventEmitter<boolean>();

  private unreadCount: number;
  private markreadCount: number;



  /** 
   * function() for the close button. Close button is shown if this callback is supplied.
   *  Callback should set drawerHidden to true to close the drawer.
   */
  onClose() {
    this.hidden = true;
    this.close.emit(this.hidden);
  }


  /**
   * function(notificationGroup) method for the mark all read button (Optional)
   */
  onMarkAllRead(group: NotificaitonGroup) {
    this.markreadCount = this.markreadCount + 1;
    group.notifications.forEach(n => n.isViewing = true);
    if (this.markreadCount === this.unreadCount) {
      this.unreadNotifications.emit(false);
    }

  }

  /**
   * 
   */
  toggleExpandDrawer() {
    this.expanded = !this.expanded;
  }

  updateUnreadStatus(group: NotificaitonGroup) {
    return find(group.notifications, { isViewing: true });
  }


  /**
   * 
   */
  hasUnread(group: NotificaitonGroup) {
    return size(filter(get(group, 'notifications'), { 'isViewing': false })) > 0;
  }

  /**
   * 
   */
  hasNotifications(group: NotificaitonGroup[]) {
    return size(get(group, 'notifications')) > 0;
  }

  /**
   * function(notificationGroup) method for the clear all button (Optional)
   */
  onClearAll(group: NotificaitonGroup) {
    group.notifications = null;
    group.subHeading = '0 New Events';
  }



  /**
   * 
   */
  toggleCollapse(group: NotificaitonGroup) {
    group.open = !group.open;
  }


 

  ngOnInit(): void {
    this.notificationGroups.forEach(grp => grp.open = false);
    this.singleGroup = size(this.notificationGroups) < 2;
    this.setEmptyConfig();
    this.readConfig();
  }



  /**
   * The default constructor
   */
  constructor() {}

  private readConfig() {
    this.markreadCount = 0;
    this.unreadCount = this.totalUnreadGroup(this.notificationGroups);
    if (this.unreadCount > 0) {
      this.unreadNotifications.emit(true);
    } else {
      this.unreadNotifications.emit(false);
    }
  }

  private setEmptyConfig() {
    this.emptyStateConfig = {
      iconStyleClass: 'pficon-info',
      title: this.noNotificationsText || this.noNotificationsText || 'There are no notifications to display.'
    };
  }

  private totalUnreadGroup(groups: NotificaitonGroup[]) {
    return size(filter(
      groups.map(g => filter(get(g, 'notifications'), { 'isViewing': false }).length > 0),
      o => { return o === true; }));
  }


}



