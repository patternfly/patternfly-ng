import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { CopyEvent } from '../../copy-event';

import { Notification } from '../../../notification/notification';
import { NotificationService } from '../../../notification/notification-service/notification.service';
import { NotificationType } from '../../../notification/notification-type';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'inline-copy-a11y-example',
  templateUrl: './inline-copy-a11y-example.component.html'
})
export class InlineCopyA11yExampleComponent implements OnInit {
  actionsText: string = '';
  notifications: Notification[];

  a11yEx01 = {
    buttonAriaLabel: 'WAI-ARIA URL',
    tooltip: 'ARIA W3C Recommendation',
    value: 'https://www.w3.org/TR/wai-aria-1.1/'
  };

  a11yEx02 = {
    buttonAriaLabel: 'Example Sparql Query',
    tooltip: 'Semantic Triple (SPO)',
    value: 'SELECT ?x ?fname WHERE {?x <http://www.w3.org/2001/vcard-rdf/3.0#FN> ?fname}'
  };

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications();
  }

  handleCopy($event: CopyEvent, result: any): void {
    this.actionsText = 'Copied: ' + $event.value + '\r\n' + this.actionsText;
    this.notify(result);
  }

  notify(result: any): void {
    this.notificationService.message(
      NotificationType.SUCCESS,
      null,
      result.msg,
      false,
      null,
      null);
  }
}
