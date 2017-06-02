/*
 * A sortable field containing:
 *
 * id - Optional unique Id for the sort field, useful for comparisons
 * title - The title to display for the sort field
 * sortType - The sort field type
 */
export class SortField {
  id: string;
  title: string;
  sortType: string;
}
