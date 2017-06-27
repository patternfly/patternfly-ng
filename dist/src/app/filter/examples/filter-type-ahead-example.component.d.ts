import { OnInit } from '@angular/core';
import { Filter } from '../filter';
import { FilterConfig } from '../filter-config';
import { FilterEvent } from '../filter-event';
export declare class FilterTypeAheadExampleComponent implements OnInit {
    allItems: any[];
    items: any[];
    filterConfig: FilterConfig;
    filtersText: string;
    monthQueries: any[];
    monthQueriesFixed: any[];
    separator: Object;
    weekDayQueries: any[];
    constructor();
    ngOnInit(): void;
    applyFilters(filters: Filter[]): void;
    filterChanged($event: FilterEvent): void;
    filterFieldSelected($event: FilterEvent): void;
    matchesFilter(item: any, filter: Filter): boolean;
    matchesFilters(item: any, filters: Filter[]): boolean;
    filterQueries($event: FilterEvent): void;
}
