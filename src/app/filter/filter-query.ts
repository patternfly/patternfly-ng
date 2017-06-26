/*
 * A filterable field containing:
 *
 * id - Optional unique Id for the filter field, useful for comparisons
 * value - Filter query value used when filterType is 'select'
 */
export class FilterQuery {
  id?: string;
  value?: string;
  imageUrl?: string;
  iconClass?: string;
  separator?: boolean;
}
