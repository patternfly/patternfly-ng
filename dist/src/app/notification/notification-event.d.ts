import { Action } from '../models/action';
import { Notification } from './notification';
export declare class NotificationEvent {
    action?: Action;
    notification: Notification;
    isViewing?: boolean;
}
