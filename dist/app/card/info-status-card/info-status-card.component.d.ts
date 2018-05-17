import { DoCheck, OnInit } from '@angular/core';
import { InfoStatusCardConfig } from './info-status-card-config';
/**
 * Info Status Card Component
 *
 * Usage:
 * <br/><code>import { InfoStatusCardModule } from 'patternfly-ng/card';</code>
 *
 * Or:
 * <br/><code>import { InfoStatusCardModule } from 'patternfly-ng';</code>
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
