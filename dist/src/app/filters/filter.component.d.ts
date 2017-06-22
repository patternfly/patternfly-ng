import { EventEmitter, OnInit } from '@angular/core';
import { Filter } from './filter';
import { FilterConfig } from './filter-config';
import { FilterEvent } from './filter-event';
/**
 * Component for the filter bar's filter entry components
 */
export declare class FilterComponent implements OnInit {
    config: FilterConfig;
    onChange: EventEmitter<{}>;
    onFilterQueries: EventEmitter<{}>;
    onFilterSelect: EventEmitter<{}>;
    prevConfig: FilterConfig;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    setupConfig(): void;
    addFilter($event: FilterEvent): void;
    clear($event: Filter[]): void;
    enforceSingleSelect(filter: Filter): void;
    fieldSelected(): void;
    filterExists(filter: Filter): boolean;
    filterQueries(event: any): void;
}
