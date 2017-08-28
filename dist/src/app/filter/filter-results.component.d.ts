import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { FilterConfig } from './filter-config';
/**
 * Component for the filter results
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
    private defaultConfig;
    private prevConfig;
    /**
     * The default constructor
     */
    constructor();
    /**
     *  Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     *  Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Set up default config
     */
    protected setupConfig(): void;
    private clearFilter(filter);
    private clearAllFilters();
}
