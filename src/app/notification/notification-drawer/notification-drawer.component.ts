import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NotificaitonGroup } from '../notification-group';
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
   * Flag if the drawer is currently hidden
   */
  @Input() drawerHidden: boolean;


  /**
   * Flag if the drawer can be expanded. Optional, default: false
   */
  @Input() allowExpand: boolean;


  /**
   * Flag if the drawer is expanded (only valid if allowExpand is true). Optional, default: false
   */
  @Input() drawerExpanded: boolean;


  /**
   * Title to display for the drawer (leaving this blank will remove the provided expand capability)
   */
  @Input() drawerTitle: string;


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
   * Include src for the title area for the notification drawer, use this
   * to customize the drawer title area
   */
  @Input() titleInclude: string;



  /**
   * Include src for the notification body for each notification,
   * access the notification via notification
   */
  @Input() notificationBodyInclude: string;


  /**
   * Include src for the notification footer for each notification,
   * access the notification via notification
   */
  @Input() notificationFooterInclude: string;


  /**
   * Text to show when there are no notifications. Optional.
   */
  @Input() noNotificationsText: string;


  @Input() singleGroup: number = 1;


  /**
   * function(notificationGroup) Callback method for the mark all read button (Optional)
   */
  onMarkAllRead() {

  }

  /**
   * 
   */
  toggleExpandDrawer() {
    this.drawerExpanded = !this.drawerExpanded;
  }


  /**
   * 
   */
  hasUnread() {

  }

  /**
   * 
   */
  hasNotifications() {

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
  toggleCollapse() {

  }

  /**
   * function() Callback for the close button. Close button is shown if this callback is supplied.
   * Callback should set drawerHidden to true to close the drawer.
   */
  onClose() {

  }



  ngOnInit(): void {

  }



  /**
   * The default constructor
   */
  constructor() {
  }


}



