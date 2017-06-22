import { Action } from '../models/action';

/*
 * A notification message containing:
 *
 * header - The header to display for the notification (optional)
 * isPersistent - Flag to show close button for the notification even if showClose is false
 * isViewing - Flag indicating user is actively viewing notification
 * message - The main text message of the notification
 * moreActions  Optional list of actions to place in the kebab menu
 * showClosed - Flag to show the close button on all notifications (not shown with menu actions)
 * type - The type of the notification message; 'success','info','danger', 'warning'
 * visible - Flag indicating notification should be visible
 */
export class Notification {
  header?: string;
  isPersistent?: boolean;
  isViewing?: boolean;
  message: string;
  moreActions?: Action[];
  primaryAction?: Action;
  showClose?: boolean;
  type: string;
  visible?: boolean;
}
