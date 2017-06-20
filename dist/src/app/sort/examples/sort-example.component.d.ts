import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SortConfig } from '../sort-config';
import { SortField } from '../sort-field';
import { SortEvent } from '../sort-event';
export declare class SortExampleComponent implements OnInit {
    private router;
    allItems: any[];
    items: any[];
    isAscendingSort: boolean;
    sortConfig: SortConfig;
    currentSortField: SortField;
    monthVals: any;
    constructor(router: Router);
    ngOnInit(): void;
    compare(item1: any, item2: any): number;
    sortChange($event: SortEvent): void;
}
