import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'copy-service-example',
  templateUrl: './copy-service-example.component.html'
})
export class CopyServiceExampleComponent {
  activeTab: string = '';

  constructor() {}

  tabSelected($event: TabDirective): void {
    this.activeTab = $event.heading;
  }
}
