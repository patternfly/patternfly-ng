import { PaginationConfig } from '../pagination/pagination-config';
import { ToolbarConfig } from '../toolbar/toolbar-config';

/**
 * An config containing properties for data table
 */
export class DataTableConfig {
  paginationConfig?: PaginationConfig;

  showCheckbox?: boolean;

  toolbarConfig?: ToolbarConfig;
}
