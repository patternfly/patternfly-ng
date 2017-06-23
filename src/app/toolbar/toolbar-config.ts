import { ActionConfig } from '../models/action-config';
import { FilterConfig } from '../filter/filter-config';
import { SortConfig } from '../sort/sort-config';
import { ViewConfig } from '../models/view-config';

/*
 * A toolbar config containing:
 *
 * actionConfig - Optional configuration settings for toolbar actions
 * filterConfig - Optional filter config. If undefined, no filtering capabilities are shown.
 * sortConfig  - Optional sort config. If undefined, no sort capabilities are shown.
 * viewConfig - Optional configuration settings for view type selection
 */
export class ToolbarConfig {
  actionConfig?: ActionConfig;
  filterConfig?: FilterConfig;
  sortConfig?: SortConfig;
  viewConfig?: ViewConfig;
}
