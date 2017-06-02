import { EventEmitter, OnInit } from '@angular/core';
import { SortConfig } from './sort-config';
import { SortField } from './sort-field';
export declare class SortComponent implements OnInit {
    config: SortConfig;
    onChange: EventEmitter<{}>;
    show: boolean;
    currentField: SortField;
    prevConfig: SortConfig;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    setupConfig(): void;
    toggle(): void;
    open(): void;
    close(): void;
    getSortIconClass(): string;
    onChangeDirection(): void;
    selectField(field: SortField): void;
}
