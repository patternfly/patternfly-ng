import { ActionsConfig } from '../models/actions-config';
import { FilterConfig } from '../filters/filter-config';
import { SortConfig } from '../sort/sort-config';
import { ViewsConfig } from '../models/views-config';

/*
 * A toolbar config containing:
 *
 * actionsConfig - Optional configuration settings for toolbar actions
 * filterConfig - Optional filter config. If undefined, no filtering capabilities are shown.
 * sortConfig  - Optional sort config. If undefined, no sort capabilities are shown.
 * viewsConfig - Optional configuration settings for view type selection
 */
export class ToolbarConfig {
  actionsConfig?: ActionsConfig;
  filterConfig?: FilterConfig;
  sortConfig?: SortConfig;
  viewsConfig?: ViewsConfig;
}
