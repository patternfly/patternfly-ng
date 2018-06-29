import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { ApplicationLauncherItem } from './application-launcher-item';

/**
 * Application launcher component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ApplicationLauncherModule } from 'patternfly-ng/navigation';
 * // Or
 * import { ApplicationLauncherModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [ApplicationLauncherModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-application-launcher',
  templateUrl: './application-launcher.component.html'
})
export class ApplicationLauncherComponent  implements OnInit {
  /**
   * Disable the application launcher button, default: false
   */
  @Input() disabled: boolean;

  /**
   * The navigation items used to build the menu
   */
  @Input() items: ApplicationLauncherItem[];

  /**
   *  Use a custom label for the launcher, default: Application Launcher
   */
  @Input() label: string;

  /**
   * Display items as a list instead of a grid, default: false
   */
  @Input() showAsList: boolean = false;

  /**
   * Flag to show icons on the launcher, default: true
   */
  @Input() showIcons: boolean = true;

  /**
   * The default constructor
   */
  constructor() {}

  /**
   * Initialize variable
   */
  ngOnInit(): void {
  }
}
