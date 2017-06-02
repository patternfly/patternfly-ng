import { SortField } from './sort-field';

/*
 * A filter config containing:
 *
 * isAscending - True if sort is ascending
 * fields - List of sortable fields
 * show - Optional flag to show sort functionality
 */
export class SortConfig {
  isAscending?: boolean = true;
  fields: SortField[];
  show?: boolean = true;
}
