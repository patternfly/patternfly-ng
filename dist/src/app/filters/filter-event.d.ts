import { Filter } from './filter';
import { FilterField } from './filter-field';
import { FilterQuery } from './filter-query';
export declare class FilterEvent {
    appliedFilters?: Filter[];
    field: FilterField;
    query?: FilterQuery;
    value?: string;
}
