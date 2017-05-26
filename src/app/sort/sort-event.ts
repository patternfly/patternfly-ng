import { SortField } from './sort-field';

/*
 * A sort event containing:
 *
 * field - A filterable field
 * isAscending - True if sort is ascending
 */
export class SortEvent {
  field: SortField;
  isAscending: boolean = true;
}
