import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NotificationType } from '../../notification-type';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'inline-notification-example',
  templateUrl: './inline-notification-example.component.html'
})
export class InlineNotificationExampleComponent implements OnInit {
  dismissable: boolean;
  header: string = 'Default Header.';
  message: string = 'Default Message.';
  dismissible: false;
  type: NotificationType;
  types: NotificationType[];
  hidden: string;
  actionText: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.types = [
      NotificationType.SUCCESS,
      NotificationType.INFO,
      NotificationType.DANGER,
      NotificationType.WARNING
    ];
    this.type = this.types[0];
  }

  // Action functions

  handleRemove($event: any): void {
    this.hidden = $event;
    if ($event) {
      this.actionText += 'Notification removed \n';
    }
  }

  handleType(item: string): void {
    this.type = item;
  }
}
