import { EventEmitter, OnInit } from '@angular/core';
import { Notification } from './notification';
import { NotificationEvent } from './notification-event';
export declare class ToastNotificationListComponent implements OnInit {
    notifications: Notification[];
    showClose: boolean;
    onActionSelect: EventEmitter<{}>;
    onCloseSelect: EventEmitter<{}>;
    onViewingChange: EventEmitter<{}>;
    constructor();
    ngOnInit(): void;
    handleAction($event: NotificationEvent): void;
    handleClose($event: NotificationEvent): void;
    handleViewingChange($event: NotificationEvent): void;
}
