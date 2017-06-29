import { View } from './view';

/*
 * An view config containing common properties for multiple views
 */
export class ViewConfig {
  /**
   * The currently selected view
   */
  currentView?: View;

  /**
   * List of available views.
   */
  views: View[];
}
