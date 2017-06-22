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
    onFilterQueries: EventEmitter<{}>;
    onFieldSelect: EventEmitter<{}>;
    currentField: FilterField;
    currentValue: string;
    prevConfig: FilterConfig;
    show: boolean;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    setupConfig(): void;
    filterQueries(value: string): void;
    onValueKeyPress(keyEvent: KeyboardEvent): void;
    selectField(field: FilterField): void;
    selectValue(filterQuery: FilterQuery): void;
}
