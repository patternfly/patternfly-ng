import { EmptyStateConfig } from '../empty-state/empty-state-config';
/**
 * A config containing properties for tree list
 */
export declare class ListBaseConfig {
    /**
     * Handle double clicking (item remains selected on a double click). Default is false
     */
    dblClick?: boolean;
    /**
     * A config containing properties for empty state when no items are available
     */
    emptyStateConfig?: EmptyStateConfig;
    /**
     * Allow multiple item selections
     *
     * Not applicable when dblClick is true. Default is false
     */
    multiSelect?: boolean;
    /**
     * Allow item selection. Default is false
     */
    selectItems?: boolean;
    /**
     * Show checkbox for selecting items. Default is true
     */
    showCheckbox?: boolean;
}
