import { Filter } from './filter';
import { FilterField } from './filter-field';
export declare class FilterConfig {
    appliedFilters?: Filter[];
    fields: FilterField[];
    resultsCount?: number;
    selectedCount?: number;
    totalCount?: number;
    tooltipPlacement?: string;
}
