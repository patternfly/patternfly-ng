import { ActionsConfig } from '../models/actions-config';

/*
 * An empty state config containing:
 *
 * actionsConfig - Optional configuration settings for toolbar actions
 * icon - class for main icon. Ex. 'pficon pficon-add-circle-o'
 * info - Text for the main informational paragraph
 * title - Text for the main title
 *
 */
export class EmptyStateConfig {
  actions?: ActionsConfig;
  helpLink?: {
    label: string;
    urlLabel?: string;
    url: string;
  };
  icon?: string;
  info: string;
  title: string;
}
