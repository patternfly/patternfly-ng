import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { NavigationItemConfig } from '../../navigation-item-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'application-launcher-example',
  templateUrl: './application-launcher-example.component.html'
})
export class ApplicationLauncherExampleComponent  implements OnInit {
  disabled: boolean = false;
  navigationItems: NavigationItemConfig[];
  showIcons: boolean = true;

  ngOnInit(): void {
    this.navigationItems = [{
      title: 'Recteque',
      url : '#/applauncher',
      iconStyleClass: 'pficon-storage-domain',
      badges: [{
        count: 1,
        tooltip: 'Launch the Function User Interface'
      }]
    }, {
      title: 'Suavitate',
      url : '#/applauncher',
      iconStyleClass: 'pficon-build',
      badges: [{
        count: 2,
        tooltip: 'Launch the Function User Interface'
      }]
    }, {
      title: 'Lorem',
      url : '#/applauncher',
      iconStyleClass: 'pficon-domain',
      badges: [{
        count: 3,
        tooltip: 'Launch the Function User Interface'
      }]
    }, {
      title: 'Home',
      url : '/',
      iconStyleClass: 'pficon-home',
      badges: [{
        count: 4,
        tooltip: 'Launch the Function User Interface'
      }]
    }];
  }

  /**
   * The default constructor
   */
  constructor() {}
}
