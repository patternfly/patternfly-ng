import { PaginationConfig } from '../pagination/pagination-config';
import { ToolbarConfig } from '../toolbar/toolbar-config';

/**
 * An config containing properties for data table
 */
export class DataTableConfig {

  /**
   * Enable drag and drop. Default is false.
   */
  dragEnabled?: boolean;

  paginationConfig?: PaginationConfig;

  showCheckbox?: boolean;

  toolbarConfig?: ToolbarConfig;
}
