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
    copyBtnAriaLabel: 'Copy WAI-ARIA URL',
    copyValue: 'https://www.w3.org/TR/wai-aria-1.1/',
    tooltip: 'ARIA W3C Recommendation'
  };

  constructor() {}

  ngOnInit() {}

  handleCopyToClipboard($event: CopyEvent): void {
    this.actionsText = 'Copied: ' + $event.value + '\r\n' + this.actionsText;
  }
}
