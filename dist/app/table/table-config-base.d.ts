import { EmptyStateConfig } from '../empty-state/empty-state-config';
import { PaginationConfig } from '../pagination/pagination-config';
import { ToolbarConfig } from '../toolbar/toolbar-config';
/**
 * An config containing properties for tables
 */
export declare class TableConfigBase {
    /**
     * A config containing properties for empty state when no rows are available
     */
    emptyStateConfig?: EmptyStateConfig;
    /**
     * A config containing properties for pagination
     */
    paginationConfig?: PaginationConfig;
    /**
     * Show checkbox for selecting rows. Default is true
     */
    showCheckbox?: boolean;
    /**
     * A config containing properties for toolbar
     */
    toolbarConfig?: ToolbarConfig;
}
