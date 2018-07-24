import { DoCheck, OnInit } from '@angular/core';
import { InfoStatusCardConfig } from './info-status-card-config';
/**
 * Info Status Card Component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { InfoStatusCardModule } from 'patternfly-ng/card';
 * // Or
 * import { InfoStatusCardModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [InfoStatusCardModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { InfoStatusCardConfig } from 'patternfly-ng/card';
 * </pre></code>
 */
export declare class InfoStatusCardComponent implements OnInit, DoCheck {
    /**
     * The config object containing component properties
     */
    config: InfoStatusCardConfig;
    private defaultConfig;
    private prevConfig;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Check if any component config props have changed
     */
    ngDoCheck(): void;
    /**
     * Set up default config
     */
    protected setupConfig(): void;
}
