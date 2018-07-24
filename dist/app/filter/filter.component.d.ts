import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { Filter } from './filter';
import { FilterConfig } from './filter-config';
import { FilterEvent } from './filter-event';
/**
 * Filter component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { FilterModule } from 'patternfly-ng/filter';
 * // Or
 * import { FilterModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [FilterModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import {
 *   Filter,
 *   FilterConfig,
 *   FilterField,
 *   FilterEvent,
 *   FilterType
 * } from 'patternfly-ng/filter';
 * </pre></code>
 */
export declare class FilterComponent implements DoCheck, OnInit {
    /**
     * The filter config containing component properties
     */
    config: FilterConfig;
    /**
     * The event emitted when a filter has been changed
     */
    onChange: EventEmitter<{}>;
    /**
     * The event emitted when a query (i.e., saved filter) has been deleted
     */
    onDelete: EventEmitter<{}>;
    /**
     * The event emitted when a field menu option is selected
     */
    onFilterSelect: EventEmitter<{}>;
    /**
     * The event emitted when a filter has been changed
     */
    onSave: EventEmitter<{}>;
    /**
     * The event emitted when the user types ahead in the query input field
     */
    onTypeAhead: EventEmitter<{}>;
    /**
     * A reference to the underlying filter fields component
     */
    private filterFields;
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
    /**
     * Handle add filter event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    addFilter($event: FilterEvent): void;
    /**
     * Handle clear filter event
     *
     * @param $event An array of current Filter objects
     */
    clearFilter($event: Filter[]): void;
    /**
     * Handle delete query (i.e., saved filter) event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    deleteQuery($event: FilterEvent): void;
    /**
     * Handle filter field selected event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    fieldSelected($event: FilterEvent): void;
    /**
     * Reset current field
     */
    resetCurrentField(): void;
    /**
     * Handle save filter event
     *
     * @param $event An array of current Filter objects
     */
    saveFilter($event: FilterEvent): void;
    /**
     * Handle type ahead event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    typeAhead($event: FilterEvent): void;
    private enforceSingleSelect;
    private filterExists;
}
