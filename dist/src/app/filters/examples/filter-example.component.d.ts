import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filter } from '../filter';
import { FilterConfig } from '../filter-config';
import { FilterEvent } from '../filter-event';
export declare class FilterExampleComponent implements OnInit {
    private router;
    allItems: any[];
    imageQueries: any[];
    imageQueriesFixed: any[];
    items: any[];
    filterConfig: FilterConfig;
    filtersText: string;
    separator: Object;
    weekDayQueries: any[];
    constructor(router: Router);
    ngOnInit(): void;
    applyFilters(filters: Filter[]): void;
    fieldSelected(event: FilterEvent): void;
    filterChange(event: FilterEvent): void;
    matchesFilter(item: any, filter: Filter): boolean;
    matchesFilters(item: any, filters: Filter[]): boolean;
    filterQueries(event: FilterEvent): void;
}
