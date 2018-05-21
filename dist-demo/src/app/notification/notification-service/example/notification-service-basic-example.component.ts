import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Notification } from '../../notification';
import { NotificationService } from '../notification.service';
import { NotificationType } from '../../notification-type';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'notification-service-basic-example',
  templateUrl: './notification-service-basic-example.component.html'
})
export class NotificationServiceBasicExampleComponent implements OnInit {
  notifications: Notification[];

  constructor(private notificationService: NotificationService) {
    this.notifications = this.notificationService.getNotifications();

    notificationService.setDelay(5000); // default is 8000
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.notificationService.message(
        NotificationType.WARNING,
        'Default Header.',
        'Default Message.',
        false,
        null,
        null);
    }, 500);
  }
}
