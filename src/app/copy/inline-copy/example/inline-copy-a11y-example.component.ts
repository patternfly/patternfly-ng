import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { CopiedMsg } from '../../copy-base';

import { Notification } from '../../../notification/notification';
import { NotificationService } from '../../../notification/notification-service/notification.service';
import { NotificationType } from '../../../notification/notification-type';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'inline-copy-a11y-example',
  templateUrl: './inline-copy-a11y-example.component.html'
})
export class InlineCopyA11yExampleComponent implements OnInit {
  notifications: Notification[];

  a11yEx01 = {
    copyBtnAriaLabel: 'WAI-ARIA URL',
    copyValue: 'https://www.w3.org/TR/wai-aria-1.1/',
    tooltip: 'ARIA W3C Recommendation'
  };

  a11yEx02 = {
    copyBtnAriaLabel: 'Example Sparql Query',
    copyValue: 'SELECT ?x ?fname WHERE {?x <http://www.w3.org/2001/vcard-rdf/3.0#FN> ?fname}',
    tooltip: 'Semantic Triple (SPO)'
  };

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications();
  }

  notify(result: CopiedMsg): void {
    this.notificationService.message(
      NotificationType.SUCCESS,
      null,
      result.msg,
      false,
      null,
      null);
  }
}
