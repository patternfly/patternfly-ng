import { View } from './view';

/*
 * A view config containing:
 *
 * views - List of available views for selection. See pfViewUtils for standard available views
 * currentView - Optional view object for the currently selected view
 */
export class ViewsConfig {
  currentView?: View;
  views: View[];
}
