import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {CopyEvent} from '../../copy-event';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'inline-copy-basic-example',
  templateUrl: './inline-copy-basic-example.component.html'
})
export class InlineCopyBasicExampleComponent implements OnInit {
  actionsText: string = '';
  basicExConfig = {
    buttonAriaLabel: 'Copy WAI-ARIA URL',
    tooltip: 'ARIA W3C Recommendation',
    value: 'https://www.w3.org/TR/wai-aria-1.1/'
  };

  constructor() {}

  ngOnInit() {}

  handleCopy($event: CopyEvent): void {
    this.actionsText = 'Copied: ' + $event.value + '\r\n' + this.actionsText;
  }
}
