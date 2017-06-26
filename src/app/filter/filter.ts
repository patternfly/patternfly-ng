import { FilterField } from './filter-field';
import { FilterQuery } from './filter-query';

/*
 * A filter containing:
 *
 * field - A filterable field
 * query - A filterable query
 * value - Filter value
 */
export class Filter {
  field: FilterField;
  query: FilterQuery;
  value: string;
}
