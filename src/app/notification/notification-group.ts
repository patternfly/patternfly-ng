import { Notification } from './notification';
import { TemplateRef } from '@angular/core';
import { EmptyStateConfig } from '../empty-state/empty-state-config';
/**
 * An object containing properties for notification groups
 */
export class NotificaitonGroup {

  
  /**
   * Include src for the heading area for each notification group,
   *  access the group via notificationGroup
   */
  heading: string;
  
  
  /**
   * Include src for the sub-heading area for each notification group,
   * access the group via notificationGroup
   */
  subHeading: string;
  
  
  /**
   * Configuration properties for a notification message
   */
  notification: Notification;
  
  /**
   * 
   */
  open: boolean;
}
