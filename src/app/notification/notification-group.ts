import { Notification } from './notification';
import { TemplateRef } from '@angular/core';
/**
 * An object containing properties for notification groups
 */
export class NotificaitonGroup {

  /**
   * Include src for the heading area for each notification group,
   *  access the group via notificationGroup
   */
  heading: TemplateRef<any>;


  /**
   * Include src for the sub-heading area for each notification group,
   * access the group via notificationGroup
   */
  subHeading: TemplateRef<any>;


  /**
   * Configuration properties for a notification message
   */
  notification: Notification;

}
