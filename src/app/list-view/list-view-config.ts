import { EmptyStateConfig } from '../empty-state/empty-state-config';

/*
 * A list view config containing:
 *
 * dlbClick - Handle double clicking (item remains selected on a double click). Default is false
 * dragEnabled - Enable drag and drop. Default is false
 * emptyStateConfig - Empty state config for when no items are available
 * headingRow - Show list heading. First row shall be used to define heading text.
 * multiSelect - Allow multiple row selections, selectItems must also be set, not applicable when dblClick is true. Default is false
 * selectedItems - Current set of selected items
 * selectItems - Allow row selection, default is false
 * selectionMatchProp - Property of the items to use for determining matching, default is 'uuid'
 * showSelectBox - Show item selection boxes for each item, default is true
 * useExpandingRows - Allow row expansion for each list item
 */
export class ListViewConfig {
  dblClick?: boolean;
  dragEnabled?: boolean;
  emptyStateConfig?: EmptyStateConfig;
  headingRow?: boolean;
  multiSelect?: boolean;
  selectedItems?: any[];
  selectItems?: boolean;
  selectionMatchProp?: string;
  showSelectBox?: boolean;
  useExpandingRows?: boolean;
}
