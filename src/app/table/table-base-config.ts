import { PaginationConfig } from '../pagination/pagination-config';
import { ToolbarConfig } from '../toolbar/toolbar-config';

/**
 * An config containing properties for tables
 */
export class TableBaseConfig {
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
