import { Action } from './action';

/*
 * An actions config containing:
 *
 * moreActions - Optional list of secondary kebab actions
 * moreActionsDisabledFn - Set to true to disable secondary actions kebab (list-view only)
 * moreActionsStyleClassFn - Optional style class for secondary actions kebab (list-view only)
 * moreActionsVisibleFn - Set to false to hide secondary actions kebab (list-view only)
 * primaryActions - List of primary button actions
 */
export class ActionConfig {
  moreActions?: Action[];
  moreActionsDisabled: boolean;
  moreActionsStyleClass: string;
  moreActionsVisible: boolean;
  primaryActions: Action[];
}
