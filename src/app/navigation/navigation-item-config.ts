import { NavigationConfigBase } from './navigation-config-base';
import {VerticalNavigationConfig} from './vertical-navigation/vertical-navigation-config';

/**
 * A config containing properties for navigation items
 *
 * @deprecated Use NavigationConfigBase
 */
export class NavigationItemConfig extends NavigationConfigBase {
  constructor() {
    super();
    console.log('patternfly-ng: NavigationItemConfig is deprecated; use NavigationConfigBase, ' +
      'ApplicationLauncherConfig, or VerticalNavigationConfig');
  }
}
