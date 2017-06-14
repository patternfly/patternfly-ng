import { EventEmitter, OnInit } from '@angular/core';
import { Filter } from './filter';
import { FilterConfig } from './filter-config';
/**
 * Component for the filter results
 */
export declare class FilterResultsComponent implements OnInit {
    config: FilterConfig;
    onClear: EventEmitter<{}>;
    prevConfig: FilterConfig;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    setupConfig(): void;
    clearFilter(filter: Filter): void;
    clearAllFilters(): void;
}
