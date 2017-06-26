import { View } from './view';

/*
 * A view config containing:
 *
 * views - List of available views for selection. See pfViewUtils for standard available views
 * currentView - Optional view object for the currently selected view
 */
export class ViewConfig {
  currentView?: View;
  views: View[];
}
