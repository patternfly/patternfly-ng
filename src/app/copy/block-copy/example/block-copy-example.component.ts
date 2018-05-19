import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'block-copy-example',
  templateUrl: './block-copy-example.component.html'
})
export class BlockCopyExampleComponent {
  activeTab: string = '';

  constructor() {}

  tabSelected($event: TabDirective): void {
    this.activeTab = $event.heading;
  }
}
