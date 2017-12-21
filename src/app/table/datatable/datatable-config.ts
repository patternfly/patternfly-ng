import { TableBaseConfig } from '../table-base-config';

/**
 * An config containing properties for data table
 */
export class DataTableConfig extends TableBaseConfig {
  /**
   * Enable drag and drop. Default is false
   */
  dragEnabled?: boolean;

  /**
   * Show checkbox for selecting rows. Default is true
   */
  showCheckbox?: boolean;
}
