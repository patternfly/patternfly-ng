import { ActionConfig } from '../models/action-config';
import { FilterConfig } from '../filter/filter-config';
import { SortConfig } from '../sort/sort-config';
import { ViewConfig } from '../models/view-config';
/**
 * A config containing properties for toolbar
 */
export declare class ToolbarConfig {
    /**
     * Config properties for toolbar actions
     */
    actionConfig?: ActionConfig;
    /**
     * Config properties for toolbar filter. If undefined, filter features are not shown.
     */
    filterConfig?: FilterConfig;
    /**
     * Config properties for toolbar sort. If undefined, sort features are not shown.
     */
    sortConfig?: SortConfig;
    /**
     * Config properties for toolbar views.
     */
    viewConfig?: ViewConfig;
}
