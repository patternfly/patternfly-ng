import { OnInit } from '@angular/core';
import { SortConfig } from '../sort-config';
import { SortField } from '../sort-field';
import { SortEvent } from '../sort-event';
export declare class SortExampleComponent implements OnInit {
    allItems: any[];
    items: any[];
    isAscendingSort: boolean;
    sortConfig: SortConfig;
    currentSortField: SortField;
    monthVals: any;
    constructor();
    ngOnInit(): void;
    compare(item1: any, item2: any): number;
    sortChange($event: SortEvent): void;
}
