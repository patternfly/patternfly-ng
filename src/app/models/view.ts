/*
 * A view available for selection containing:
 *
 * disabled - True if view is disabled
 * iconClass - Icon class to use for the view selector
 * id - Unique id for the view, used for comparisons
 * title - Optional title, uses as a tooltip for the view selector
 */
export class View {
  disabled?: boolean = false;
  iconClass: string;
  id: string;
  title: string;
}
