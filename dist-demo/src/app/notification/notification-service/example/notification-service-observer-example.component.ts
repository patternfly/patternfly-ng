import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation
  } from '@angular/core';
import { Observable } from 'rxjs';

  import { Notification } from '../../notification';
  import { NotificationService } from '../notification.service';
  import { NotificationType } from '../../notification-type';

  @Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'notification-service-observer-example',
    templateUrl: './notification-service-observer-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class NotificationServiceObserverExampleComponent implements OnInit {
    notifications: Observable<Notification[]>;

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit(): void {
      this.notifications = this.notificationService.getNotificationsObserver;
      // Display notifications to illustrate how
      // one can react to a notifications observer

      // Track Notifications
      this.notificationService.getNotificationsObserver
        .subscribe((notification) => {
          console.log(notification);
        });
    }

    launchNotification(): void {
      this.notificationService.message(
        NotificationType.SUCCESS,
        'Example header',
        'Open js console to see notifications observer in action',
        false,
        null,
        null
      );
    }
  }
