import { Notification } from './notification';
/**
 * An object containing properties for notification groups
 */
export class NotificaitonGroup {

  /**
   * Include src for the heading area for each notification group,
   *  access the group via notificationGroup
   */
   headingInclude: string;


  /**
   * Include src for the sub-heading area for each notification group,
   * access the group via notificationGroup
   */
  subheadingInclude: string;


  /**
   * Configuration properties for a notification message
   */
  notification: Notification;

}
