import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'toast-notification-example',
  templateUrl: './toast-notification-example.component.html'
})
export class ToastNotificationExampleComponent implements OnInit {
  activeTab: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }

  // Actions

  tabSelected($event: TabDirective): void {
    this.activeTab = $event.heading;
  }
}
