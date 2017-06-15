/*
 * An action for a button, dropdown, etc:
 *
 * disabled - Set to true to disable the action
 * id - Optional unique Id for the filter field, useful for comparisons
 * name - The name of the action, displayed on the button
 * separator - Set to true if this is a placehodler for a separator rather than an action
 * template - Optional template name for including custom content (listView only)
 * title - Optional title, used for the tooltip
 * visible - Set to false if this menu option should be hidden
 */
export class Action {
  disabled?: boolean = false;
  id?: string;
  name: string;
  separator?: boolean = false;
  template?: string;
  title?: string;
  visible?: boolean;
}
