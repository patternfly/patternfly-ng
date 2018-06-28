import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { Notification } from '../../../notification/notification';
import { NotificationService } from '../../../notification/notification-service/notification.service';
import { NotificationType } from '../../../notification/notification-type';
import { CopyService } from '../copy.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'copy-service-button-example',
  templateUrl: './copy-service-button-example.component.html'
})
export class CopyServiceButtonExampleComponent {

  exampleDescription: string = 'This example copies this paragraph text to the clipboard using the copy service.';
  notifications: Notification[];
  constructor(
    private copyService: CopyService,
    private notificationService: NotificationService
  ) {
    this.notifications = this.notificationService.getNotifications();
  }

  copyExampleDescription() {
    let result = this.copyService.copy(this.exampleDescription);

    if (result) {
      this.notificationService.message(
        NotificationType.SUCCESS,
        null,
        'Copied',
        false,
        null,
        null);
    }
  }
}
