import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'notification-service-example',
  templateUrl: './notification-service-example.component.html'
})
export class NotificationServiceExampleComponent implements OnInit {
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
