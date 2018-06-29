import { Notification } from './notification';
import { EmptyStateConfig } from '../empty-state/empty-state-config';
/**
 * An object containing properties for notification groups
 */
export declare class NotificaitonGroup {
    /**
     *  heading area for each notification group
     *
     */
    heading: string;
    /**
     * sub-heading area for each notification group
     *
     */
    subHeading?: string;
    /**
     *  Configuration properties for a notification message
     */
    notifications: Notification[];
    /**
     * Flag for panel collapse
     */
    open?: boolean;
    /**
     * Flag for the loading spinner
     */
    loading?: boolean;
    /**
     * Empty state config for notification
     */
    emptyStateConfig?: EmptyStateConfig;
}
