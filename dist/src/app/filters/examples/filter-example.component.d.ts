import { OnInit } from '@angular/core';
import { Filter } from '../filter';
import { FilterConfig } from '../filter-config';
import { FilterEvent } from '../filter-event';
export declare class FilterExampleComponent implements OnInit {
    allItems: any[];
    imageQueries: any[];
    imageQueriesFixed: any[];
    items: any[];
    filterConfig: FilterConfig;
    filtersText: string;
    separator: Object;
    weekDayQueries: any[];
    constructor();
    ngOnInit(): void;
    applyFilters(filters: Filter[]): void;
    fieldSelected(event: FilterEvent): void;
    filterChange(event: FilterEvent): void;
    matchesFilter(item: any, filter: Filter): boolean;
    matchesFilters(item: any, filters: Filter[]): boolean;
    filterQueries(event: FilterEvent): void;
}
