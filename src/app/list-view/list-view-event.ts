import { Action } from '../models/action';

/*
 * A list view evet containing:
 *
 * action - Configuration settings for given action
 * item - The item associated with the list view row
 * selectedItems - The currently selected items, if applicable
 */
export class ListViewEvent {
  action?: Action;
  item?: any;
  selectedItems?: any[];
}
