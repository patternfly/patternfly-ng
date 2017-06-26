import { Action } from '../models/action';
export declare class Notification {
    header?: string;
    isPersistent?: boolean;
    isViewing?: boolean;
    message: string;
    moreActions?: Action[];
    primaryAction?: Action;
    showClose?: boolean;
    type: string;
    visible?: boolean;
}
