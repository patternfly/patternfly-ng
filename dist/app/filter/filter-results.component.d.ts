import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { FilterConfig } from './filter-config';
/**
 * Helper component for the filter results
 */
export declare class FilterResultsComponent implements DoCheck, OnInit {
    /**
     * The filter config containing component properties
     */
    config: FilterConfig;
    /**
     * The event emitted when the clear action is selected
     */
    onClear: EventEmitter<{}>;
    /**
     * The event emitted when the save action is selected
     */
    onSave: EventEmitter<{}>;
    private defaultConfig;
    private prevConfig;
    private saveFilterName;
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
    private clearFilter;
    private clearAllFilters;
    private saveAllFilters;
}
