import { ActionConfig } from '../models/action-config';
export declare class EmptyStateConfig {
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
