import { OnInit } from '@angular/core';
import { Action } from '../../models/action';
import { NotificationEvent } from '../notification-event';
export declare class ToastNotificationBasicExampleComponent implements OnInit {
    actionText: string;
    header: string;
    message: string;
    moreActions: Action[];
    moreActionsDefault: Action[];
    primaryAction: Action;
    showClose: false;
    showMoreActions: boolean;
    type: string;
    types: string[];
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    handleAction($event: NotificationEvent): void;
    handleClose($event: NotificationEvent): void;
    handleType(item: string): void;
}
