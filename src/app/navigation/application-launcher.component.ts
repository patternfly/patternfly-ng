import {
    Component, ElementRef, EventEmitter,
    Input, OnInit, Output, Renderer2,
    TemplateRef, ViewEncapsulation
} from '@angular/core';

import { NavigationItemConfig } from './navigation-item-config';
import { read } from 'fs-extra';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'pfng-application-launcher',
    templateUrl: './application-launcher.component.html'
})

export class ApplicationLauncherComponent  implements OnInit {

    /**
     *  Use a custom label for the launcher, default: Application Launcher
     */
    @Input() label: string;


    /**
     * Disable the application launcher button, default: false
     */
    @Input() isDisabled: boolean;


    /**
     * Display items as a list instead of a grid, default: false
     */
    @Input() isList: boolean;


    /**
     * Flag to not show icons on the launcher, default: false
     */
    @Input() hiddenIcons: boolean;


    /**
     * The navigation items used to build the menu
     */
    @Input() items: NavigationItemConfig[];


    /**
     * Internal boolean to toggle launcher, default:false
     */
    public isClicked: boolean;


    /**
     * The default constructor
     */
    constructor() {}

    /**
     * Initialize variable
     */
    ngOnInit(): void {
      this.isClicked = false;
    }

    /**
     * toggle function for launcher, active when click, return false on isDisabled:true
     */
   public toggle() {
      if (this.isDisabled) {
        return false;
      } else {
        this.isClicked = !this.isClicked;
      }

    }


}
