import { EventEmitter, OnInit } from '@angular/core';
import { FilterConfig } from './filter-config';
import { FilterField } from './filter-field';
import { FilterQuery } from './filter-query';
/**
 * Component for the filter bar's filter entry components
 */
export declare class FilterFieldsComponent implements OnInit {
    config: FilterConfig;
    onAdd: EventEmitter<{}>;
    onFieldSelect: EventEmitter<{}>;
    onTypeAhead: EventEmitter<{}>;
    currentField: FilterField;
    currentValue: string;
    prevConfig: FilterConfig;
    show: boolean;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    setupConfig(): void;
    fieldInputKeyPress($event: KeyboardEvent): void;
    queryInputChange(value: string): void;
    selectField(field: FilterField): void;
    selectQuery(filterQuery: FilterQuery): void;
}
