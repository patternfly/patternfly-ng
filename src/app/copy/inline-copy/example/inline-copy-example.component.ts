import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'inline-copy-example',
  templateUrl: './inline-copy-example.component.html',
  styleUrls: ['./inline-copy-example.component.less']
})
export class InlineCopyExampleComponent {
  activeTab: string = '';

  constructor() {}

  tabSelected($event: TabDirective): void {
    this.activeTab = $event.heading;
  }
}