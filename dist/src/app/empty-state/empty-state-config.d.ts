import { ActionsConfig } from '../models/actions-config';
export declare class EmptyStateConfig {
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
