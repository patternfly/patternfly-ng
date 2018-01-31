import {
    Component, ElementRef, EventEmitter,
    Input, OnInit, Output, Renderer2,
    TemplateRef, ViewEncapsulation
} from '@angular/core';

import { NavigationItemConfig } from '../navigation-item-config';
import { read } from 'fs-extra';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'pfng-application-launcher',
    templateUrl: './application-launcher.component.html'
})

/**
 * Application launcher component
 */
export class ApplicationLauncherComponent  implements OnInit {

    /**
     *  Use a custom label for the launcher, default: Application Launcher
     */
    @Input() label: string;


    /**
     * Disable the application launcher button, default: false
     */
    @Input() disabled: boolean;


    /**
     * Display items as a list instead of a grid, default: false
     */
    @Input() showAsList: boolean;


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
    private _opened: boolean;


    /**
     * The default constructor
     */
    constructor() {}

    /**
     * Initialize variable
     */
    ngOnInit(): void {
      this._opened = false;
    }

    /**
     * getter
     */
    get opened(): boolean {
      return this._opened;
      }

    /**
     * toggle function for launcher, active when click, return false on isDisabled:true
     */
   public toggle() {
      if (this.disabled) {
        return false;
      } else {
        this._opened = !this._opened;
      }

    }


}
