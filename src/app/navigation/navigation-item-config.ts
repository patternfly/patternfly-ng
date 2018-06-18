import { NavigationItemBase } from './navigation-item-base';

/**
 * A config containing properties for navigation items
 *
 * @deprecated Use VerticalNavigationItem, or ApplicationLauncherItem
 */
export class NavigationItemConfig extends NavigationItemBase {
  /**
   * Navigation children (used for secondary and tertiary navigation)
   */
  children?: NavigationItemConfig[];

  /**
   * Indicate if the item should be active on load
   */
  activeOnLoad?: boolean;

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
   * Indicates if this is a mobile item
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

  constructor() {
    super();
    console.log('patternfly-ng: NavigationItemConfig is deprecated; use VerticalNavigationItem ' +
      'or ApplicationLauncherItem');
  }
}
