import { Filter } from './filter';
import { FilterField } from './filter-field';

/*
 * A filter config containing:
 *
 * appliedFilters - List of the currently applied filters
 * fileds: List of filterable fields
 * resultsCount - The number of results returned after the current applied filters have been applied
 * selectedCount - The number selected items, The 'n' in the label: 'n' of 'm' selected
 * totalCount - The total number of items before any filters have been applied.
 */
export class FilterConfig {
  appliedFilters?: Filter[];
  fields: FilterField[];
  resultsCount?: number;
  selectedCount?: number;
  totalCount?: number;
  tooltipPlacement?: string;
}
