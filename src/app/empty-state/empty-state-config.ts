import { ActionConfig } from '../models/action-config';

/*
 * An empty state config containing:
 *
 * actionConfig - Optional configuration settings for toolbar actions
 * icon - class for main icon. Ex. 'pficon pficon-add-circle-o'
 * info - Text for the main informational paragraph
 * title - Text for the main title
 *
 */
export class EmptyStateConfig {
  actions?: ActionConfig;
  helpLink?: {
    label: string;
    urlLabel?: string;
    url: string;
  };
  icon?: string;
  info: string;
  title: string;
}
