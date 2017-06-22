import { Action } from '../models/action';
import { Notification } from './notification';

/*
 * A notification evet containing:
 *
 * action - Optional configuration settings for toolbar actions
 * notification - A notification message
 * isViewing - Flag indicating user is actively viewing notification
 */
export class NotificationEvent {
  action?: Action;
  notification: Notification;
  isViewing?: boolean;
}
