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
   * Set to true to hide the close button in the expansion area. Default is false
   */
  hideClose?: boolean;

  /**
   * Allow expansion for each row
   */
  useExpandRows?: boolean;
}
