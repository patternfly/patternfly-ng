import { EventEmitter, OnInit } from '@angular/core';
import { Action } from '../models/action';
import { Notification } from './notification';
export declare class ToastNotificationComponent implements OnInit {
    header: string;
    message: string;
    moreActions: Action[];
    notification: Notification;
    primaryAction: Action;
    showClose: boolean;
    type: string;
    onActionSelect: EventEmitter<{}>;
    onCloseSelect: EventEmitter<{}>;
    onViewingChange: EventEmitter<{}>;
    showCloseButton: boolean;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    handleAction(action: Action): void;
    handleClose($event: MouseEvent): void;
    handleEnter($event: MouseEvent): void;
    handleLeave($event: MouseEvent): void;
}
