import { EventEmitter, OnInit } from '@angular/core';
import { FilterConfig } from './filter-config';
/**
 * Filter component
 */
export declare class FilterComponent implements OnInit {
    /**
     * The filter config containing component properties
     */
    config: FilterConfig;
    /**
     * The event emitted when a filter has been changed
     */
    onChange: EventEmitter<{}>;
    /**
     * The event emitted when a field menu option is selected
     */
    onFilterSelect: EventEmitter<{}>;
    /**
     * The event emitted when the user types ahead in the query input field
     */
    onTypeAhead: EventEmitter<{}>;
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
    private addFilter($event);
    private clear($event);
    private enforceSingleSelect(filter);
    private fieldSelected($event);
    private filterExists(filter);
    private typeAhead($event);
}
