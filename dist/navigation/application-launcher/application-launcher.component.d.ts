import { OnInit } from '@angular/core';
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
export declare class ApplicationLauncherComponent implements OnInit {
    /**
     * Disable the application launcher button, default: false
     */
    disabled: boolean;
    /**
     * The navigation items used to build the menu
     */
    items: ApplicationLauncherItem[];
    /**
     *  Use a custom label for the launcher, default: Application Launcher
     */
    label: string;
    /**
     * Display items as a list instead of a grid, default: false
     */
    showAsList: boolean;
    /**
     * Flag to show icons on the launcher, default: true
     */
    showIcons: boolean;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Initialize variable
     */
    ngOnInit(): void;
}
