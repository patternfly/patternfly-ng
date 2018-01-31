import {
    Component, ElementRef, EventEmitter,
    Input, OnInit, Output, Renderer2,
    TemplateRef, ViewEncapsulation
} from '@angular/core';

import { NavigationItemConfig } from '../../navigation-item-config';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'application-launcher-example',
    templateUrl: './application-launcher-example.component.html'
})

export class ApplicationLauncherExampleComponent  implements OnInit {


  hideIcons: boolean = false;



  navigationItems: NavigationItemConfig[];

  ngOnInit(): void {
    this.navigationItems = [
      {
        title: 'Recteque',
        url : '#/applauncher/recteque',
        iconStyleClass: 'pficon-storage-domain',
        badges: [{
                  count: 1,
                  tooltip: 'Launch the Function User Interface'

        }]
      },
      {
        title: 'Suavitate',
        url : '#/applauncher/intellegam/suavitate',
        iconStyleClass: 'pficon-build',
        badges: [{
                count: 2,
                tooltip: 'Launch the Function User Interface'
        }]
      },
      {
        title: 'Lorem',
        url : '#/applauncher/intellegam/lorem',
        iconStyleClass: 'pficon-domain',
        badges: [{
                count: 3,
                tooltip: 'Launch the Function User Interface'
        }]
      },
      {
        title: 'Home',
        url : '/',
        iconStyleClass: 'pficon-home',
        badges: [{
                count: 4,
                tooltip: 'Launch the Function User Interface'
        }]
      }
    ];

  }
    /**
     * The default constructor
     */
    constructor() {}




}

