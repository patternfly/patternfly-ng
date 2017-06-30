import { EmptyStateConfig } from '../empty-state/empty-state-config';

/**
 * A config containing properties for list view
 */
export class ListViewConfig {
  /**
   * Handle double clicking (item remains selected on a double click). Default is false
   */
  dblClick?: boolean;

  /**
   * Enable drag and drop. Default is false
   */
  // dragEnabled?: boolean;

  /**
   *  A config containing properties for empty state when no items are available
   */
  emptyStateConfig?: EmptyStateConfig;

  /**
   * Allow multiple item selections -- showCheckbox must also be set.
   *
   * Not applicable when dblClick is true. Default is false
   */
  multiSelect?: boolean;

  /**
   * Current set of selected items
   */
  selectedItems?: any[];

  /**
   * Allow item selection. Default is false
   */
  selectItems?: boolean;

  /**
   * Property of the items to use for determining matching. Default is 'uuid'
   */
  selectionMatchProp?: string;

  /**
   * Show checkbox for selecting items. Default is true
   */
  showCheckbox?: boolean;

  /**
   * Allow row expansion for each list item
   */
  useExpandingRows?: boolean;

  /**
   * Show list heading. First object in items array is be used to define heading content
   */
  useHeading?: boolean;
}
