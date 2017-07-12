import { OnInit } from '@angular/core';
import { Action } from '../../action/action';
import { Notification } from '../notification';
import { NotificationEvent } from '../notification-event';
import { NotificationService } from '../notification.service';
export declare class ToastNotificationListExampleComponent implements OnInit {
    private notificationService;
    actionText: string;
    header: string;
    isPersistent: boolean;
    message: string;
    moreActions: Action[];
    moreActionsDefault: Action[];
    notifications: Notification[];
    primaryAction: Action;
    showClose: boolean;
    showMoreActions: boolean;
    type: string;
    types: string[];
    typeMap: any;
    constructor(notificationService: NotificationService);
    ngOnInit(): void;
    ngDoCheck(): void;
    handleAction($event: NotificationEvent): void;
    handleClose($event: NotificationEvent): void;
    handleType(item: string): void;
    handleViewingChange($event: NotificationEvent): void;
    notify(): void;
}
