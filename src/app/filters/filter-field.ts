import { FilterQuery } from './filter-query';

/*
 * A filterable field containing:
 *
 * id - Optional unique Id for the filter field, useful for comparisons
 * placeholder - Optional text to display when no filter value has been entered
 * queries - Optional list of filter queries used when filterType is 'select'
 * title - The title to display for the filter field
 * type - The filter input field type ('select' for a select box, 'typeahead' to filter queries)
 */
export class FilterField {
  id?: string;
  placeholder?: string;
  queries?: FilterQuery[];
  title?: string;
  type: string;
}
