import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Notification } from '../../../notification/notification';
import { NotificationService } from '../../../notification/notification-service/notification.service';
import { NotificationType } from '../../../notification/notification-type';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'inline-copy-callback-example',
  templateUrl: './inline-copy-callback-example.component.html'
})
export class InlineCopyCallbackExampleComponent implements OnInit {
  notifications: Notification[];

  cbExConfig = {
    ariaLabel: 'Example Sparql Query',
    copyValue: 'SELECT ?x ?fname WHERE {?x <http://www.w3.org/2001/vcard-rdf/3.0#FN> ?fname}',
    buttonLabel: 'Copy'
  };

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications();
  }

  notify(copyValueLabel: string): void {
    this.notificationService.message(
      NotificationType.SUCCESS,
      null,
      'Sparql Query Copied!',
      false,
      null,
      null);
  }
}
