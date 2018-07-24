import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { SortConfig } from './sort-config';
/**
 * Sort component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SortModule } from 'patternfly-ng/sort';
 * // Or
 * import { SortModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SortModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { SortConfig, SortEvent, SortField } from 'patternfly-ng/sort';
 * </pre></code>
 */
export declare class SortComponent implements DoCheck, OnInit {
    /**
     * The sort config containing component properties
     */
    config: SortConfig;
    /**
     * The event emitted when the sort has changed
     */
    onChange: EventEmitter<{}>;
    private currentField;
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
     * Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Set up default config
     */
    protected setupConfig(): void;
    private getIconStyleClass;
    private onChangeDirection;
    private selectField;
}
