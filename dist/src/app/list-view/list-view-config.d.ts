import { EmptyStateConfig } from '../empty-state/empty-state-config';
/**
 * A config containing properties for list view
 */
export declare class ListViewConfig {
    /**
     * Handle double clicking (item remains selected on a double click). Default is false
     */
    dblClick?: boolean;
    /**
     * Enable drag and drop. Default is false
     */
    /**
     *  A config containing properties for empty state when no items are available
     */
    emptyStateConfig?: EmptyStateConfig;
    /**
     * Show list heading. First object in items array is be used to define heading text
     */
    headingRow?: boolean;
    /**
     * Allow multiple row selections, selectItems must also be set, not applicable when dblClick is true. Default is false
     */
    multiSelect?: boolean;
    /**
     * Current set of selected items
     */
    selectedItems?: any[];
    /**
     * Allow row selection, default is false
     */
    selectItems?: boolean;
    /**
     * Property of the items to use for determining matching, default is 'uuid'
     */
    selectionMatchProp?: string;
    /**
     * Show item selection boxes for each item, default is true
     */
    showSelectBox?: boolean;
    /**
     * Allow row expansion for each list item
     */
    useExpandingRows?: boolean;
}
