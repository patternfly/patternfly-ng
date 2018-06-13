import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { ApplicationLauncherModule } from './application-launcher/application-launcher.module';
import { NavigationItemConfig } from './navigation-item-config';
import { VerticalNavigationModule } from './vertical-navigation/vertical-navigation.module';
import { WindowReference } from '../utilities/window.reference';

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
 * } from 'patternfly-ng/navigation;
 */
@NgModule({
  imports: [
    ApplicationLauncherModule,
    BsDropdownModule.forRoot(),
    CommonModule,
    TooltipModule.forRoot(),
    VerticalNavigationModule
  ],
  providers: [ BsDropdownConfig, TooltipConfig, WindowReference ]
})
export class NavigationModule {
  constructor() {
    console.log('patternfly-ng: NavigationModule is deprecated; use ApplicationLauncherModule ' +
      'or VerticalNavigationModule');
  }
}
