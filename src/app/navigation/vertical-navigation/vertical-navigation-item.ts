import { NavigationItemBase } from '../navigation-item-base';

/**
 * A config containing properties for vertical navigation items
 */
export class VerticalNavigationItem extends NavigationItemBase {
  /**
   * Navigation children (used for secondary and tertiary navigation)
   */
  children?: VerticalNavigationItem[];

  /**
   * Indicate if the item should be active on load
   */
  activeOnLoad?: boolean;

  /**
   * Unique Id for the navigation item
   */
  id?: string;

  /**
   * Track the active state of the navigation item
   */
  trackActiveState?: boolean;

  /**
   * Track the hover state of the navigation item
   */
  trackHoverState?: boolean;

  /**
   * Indicates if the child secondary menu is opened
   */
  secondaryCollapsed?: boolean;

  /**
   * Indicates if the child tertiary menu is opened
   */
  tertiaryCollapsed?: boolean;

  /**
   * Indicates if this is a mobile item -- for component use only
   */
  mobileItem?: boolean;

  /**
   * Internal variable used for hovering timeout
   */
  hoverTimeout?: any;

  /**
   * Internal variable used for blur timeout
   */
  blurTimeout?: any;
}
