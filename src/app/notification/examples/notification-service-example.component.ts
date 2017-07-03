import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Notification } from '../notification';
import { NotificationService } from '../notification.service';
import { NotificationType } from '../notification-type';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'notification-service-example',
  templateUrl: './notification-service-example.component.html'
})
export class NotificationServiceExampleComponent implements OnInit {
  notifications: Notification[];

  constructor(private notificationService: NotificationService) {
    this.notifications = this.notificationService.getNotifications();

    notificationService.setDelay(5000); // default is 8000
  }

  ngOnInit(): void {
    this.notificationService.message(
      NotificationType.WARNING,
      'Default Header.',
      'Default Message.',
      false,
      null,
      null);
  }
}
