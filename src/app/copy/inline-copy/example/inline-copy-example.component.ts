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
  selector: 'inline-copy-example',
  templateUrl: './inline-copy-example.component.html',
  styleUrls: ['./inline-copy-example.component.less']
})
export class InlineCopyExampleComponent implements OnInit {
  notifications: Notification[];

  example01 = {
    label: 'Example Sparql Query',
    token: 'SELECT ?x ?fname WHERE {?x <http://www.w3.org/2001/vcard-rdf/3.0#FN> ?fname}',
    copyBtnTxt: 'Copy'
  };

  example02 = {
    label: 'WAI-ARIA URL',
    token: 'https://www.w3.org/TR/wai-aria-1.1/'
  };

  example03 = {
    label: 'JSON+LD Schema Example',
    // tslint:disable-next-line:max-line-length
    token: '{"@context":"http://www.w3.org/TR/wai-aria/","@type":"WAI-ARIA Roles","@value":"http://www.w3.org/TR/wai-aria/roles","category":"http://www.w3.org/TR/wai-aria/roles#roles_categorization","role":[{"@type":"application","@value":"http://www.w3.org/TR/wai-aria/roles#application","category":"http://www.w3.org/TR/wai-aria/roles#landmark_roles","description":"A region declared as a web application, as opposed\n            to a web document."},{"@type":"banner","@value":"http://www.w3.org/TR/wai-aria/roles#banner","category":"http://www.w3.org/TR/wai-aria/roles#landmark_roles","description":"A region that contains mostly site-oriented content,\n             rather than page-specific content."},{"@type":"complementary","@value":"http://www.w3.org/TR/wai-aria/roles#complementary","category":"http://www.w3.org/TR/wai-aria/roles#landmark_roles","description":"A supporting section of the document, designed to be\n             complementary to the main content at a similar level in the\n             DOM hierarchy, but remains meaningful when separated from\n             the main content."},{"@type":"contentinfo","@value":"http://www.w3.org/TR/wai-aria/roles#contentinfo","category":"http://www.w3.org/TR/wai-aria/roles#landmark_roles","description":"A large perceivable region that contains information\n             about the parent document."},{"@type":"form","@value":"http://www.w3.org/TR/wai-aria/roles#form","category":"http://www.w3.org/TR/wai-aria/roles#landmark_roles","description":"A landmark region that contains a collection of items\n             and objects that, as a whole, combine to create a form."},{"@type":"main","@value":"http://www.w3.org/TR/wai-aria/roles#main","category":"http://www.w3.org/TR/wai-aria/roles#landmark_roles","description":"The main content of a document."},{"@type":"navigation","@value":"http://www.w3.org/TR/wai-aria/roles#navigation","category":"http://www.w3.org/TR/wai-aria/roles#landmark_roles","description":"A collection of navigational elements (usually links)\n             for navigating the document or related documents."},{"@type":"search","@value":"http://www.w3.org/TR/wai-aria/roles#search","category":"http://www.w3.org/TR/wai-aria/roles#landmark_roles","description":"A landmark region that contains a collection of items\n             and objects that, as a whole, combine to create a search facility."}]}'
  };

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications();
  }

  notify(tokenLabel: string): void {
    this.notificationService.message(
      NotificationType.SUCCESS,
      null,
      'Sparql Query Copied!',
      false,
      null,
      null);
  }

}
