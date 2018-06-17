import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { ApplicationLauncherConfig } from './application-launcher-config';

/**
 * Application launcher component
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
  @Input() items: ApplicationLauncherConfig[];

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
