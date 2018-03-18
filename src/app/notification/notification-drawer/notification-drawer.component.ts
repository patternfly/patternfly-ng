import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { NotificaitonGroup } from '../notification-group';

import { get, size } from 'lodash';
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
  @Input() showMarkAllRead: boolean;
  
  
  
  /**
   * Flag if the clear all button should be shown, optional, default is false
   */
  @Input() showClearAll: boolean;
  
  
  /**
   * Text for the lower action button of the drawer (optional,
   * if not specified there will be no action button)
   */
  @Input() actionButtonTitle: string;
  
  
  
  /**
   * Template src for the title area for the notification drawer, use this
   * to customize the drawer title area
   */
  @Input() titleTemplate:  TemplateRef<any>;
  
  
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
  
  @Input() isCollapsed: boolean = false;
  
  
  /**
   * function(notificationGroup) Callback method for the mark all read button (Optional)
   */
  onMarkAllRead() {
    
  }
  
  /**
   * 
   */
  toggleExpandDrawer() {
    this.expanded = !this.expanded;
  }
  
  
  /**
   * 
   */
  hasUnread() {
    
  }
  
  /**
   * 
   */
  hasNotifications(group: NotificaitonGroup[]) {
    return size(get(group, 'notifications')) > 0;
  }

  /**
   * function(notificationGroup) Callback method for the clear all button (Optional)
   */
  onClearAll() {

  }


  /**
   * function(notificationGroup) Callback method for action button for each group,
   * the notificationGroup is passed (Optional)
   */
  actionButtonCallback() {

  }

  
  /**
   * 
   */
  toggleCollapse(group: NotificaitonGroup) {   
    group.open = !group.open;
  }

  /**
   * function() Callback for the close button. Close button is shown if this callback is supplied.
   * Callback should set drawerHidden to true to close the drawer.
   */
  onClose() {

  }


  ngOnInit(): void {
    this.notificationGroups.forEach(group => group.open = false);
    this.singleGroup  = size(this.notificationGroups) < 2;
    this.emptyStateConfig = {
              iconStyleClass: 'pficon-info',
              title: this.noNotificationsText || this.noNotificationsText || 'There are no notifications to display.'
            };
    
  }



  /**
   * The default constructor
   */
  constructor() {

  }


}



