import { EventEmitter, OnInit } from '@angular/core';
import { FilterConfig } from './filter-config';
/**
 * Component for the filter results
 */
export declare class FilterResultsComponent implements OnInit {
    /**
     * The filter config containing component properties
     */
    config: FilterConfig;
    /**
     * The event emitted when the clear action is selected
     */
    onClear: EventEmitter<{}>;
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
    private setupConfig();
    private clearFilter(filter);
    private clearAllFilters();
}
