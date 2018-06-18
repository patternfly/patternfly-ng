import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplicationLauncherComponent } from './application-launcher/application-launcher.component';
import { ApplicationLauncherModule } from './application-launcher/application-launcher.module';
import { NavigationItemConfig } from './navigation-item-config';
import { VerticalNavigationComponent } from './vertical-navigation/vertical-navigation.component';
import { VerticalNavigationModule } from './vertical-navigation/vertical-navigation.module';

export {
  NavigationItemConfig
};

/**
 * A module containing objects associated with the navigation components
 *
 * @deprecated Use individual module imports
 *
 * import {
 *   ApplicationLauncherModule,
 *   VerticalNavigationModule
 * } from 'patternfly-ng/navigation';
 */
@NgModule({
  imports: [
    ApplicationLauncherModule,
    CommonModule,
    VerticalNavigationModule
  ],
  exports: [ ApplicationLauncherComponent, VerticalNavigationComponent]
})
export class NavigationModule {
  constructor() {
    console.log('patternfly-ng: NavigationModule is deprecated; use ApplicationLauncherModule ' +
      'or VerticalNavigationModule');
  }
}
