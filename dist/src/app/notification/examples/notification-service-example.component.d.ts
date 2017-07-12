import { OnInit } from '@angular/core';
import { Notification } from '../notification';
import { NotificationService } from '../notification.service';
export declare class NotificationServiceExampleComponent implements OnInit {
    private notificationService;
    notifications: Notification[];
    constructor(notificationService: NotificationService);
    ngOnInit(): void;
}
