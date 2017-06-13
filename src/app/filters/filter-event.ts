import { Filter } from './filter';
import { FilterField } from './filter-field';
import { FilterQuery } from './filter-query';

/*
 * A filter event containing:
 *
 * appliedFilters - List of the currently applied filters
 * field - A filterable field
 * query - A filterable query
 * value - The filter input field value
 */
export class FilterEvent {
  appliedFilters?: Filter[];
  field: FilterField;
  query?: FilterQuery;
  value?: string;
}
