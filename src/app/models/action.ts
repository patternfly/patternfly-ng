import { TemplateRef } from '@angular/core';

/*
 * An action for a button, dropdown, etc:
 *
 * disabled - Set to true to disable the action
 * id - Optional unique Id for the filter field, useful for comparisons
 * name - The name of the action, displayed on the button
 * separator - Set to true if this is a placehodler for a separator rather than an action
 * styleClass - Optional style class for action
 * template - Optional template name for including custom content (primary actions only)
 * title - Optional title, used for the tooltip
 * visible - Set to false if this menu option should be hidden
 */
export class Action {
  disabled?: boolean;
  id?: string;
  name: string;
  separator?: boolean ;
  styleClass?: string;
  template?: TemplateRef<any>;
  title?: string;
  visible?: boolean;
}
