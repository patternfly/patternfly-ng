import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { CopyService } from '../copy-service/copy.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-inline-copy',
  templateUrl: './inline-copy.component.html',
  styleUrls: ['./inline-copy.component.less']
})

export class InlineCopyComponent implements OnInit {
  @Input('ariaLabel') ariaLabel: string;
  @Input('copyValue') copyValue: string = 'Missing \'copyValue\' @Input property';
  @Input('buttonLabel') buttonLabel: string = 'Copy';
  @Input('tooltipTxt') tooltipTxt: string;

  @Output('copiedToClipboard') copiedToClipboard = new EventEmitter();

  /**
   * The default constructor
   */
  constructor(
    private copyService: CopyService) {}

  ngOnInit(): void {
    if (!this.ariaLabel) throw new Error('Missing required @Input property \'ariaLabel\'');
    if (!this.tooltipTxt) {
      this.tooltipTxt = this.ariaLabel;
    }
  }

  /**
   * Copy value to the user's system clipboard
   */
  copyValueToClipboard(): void {
    let result = this.copyService.copy(this.copyValue);
    if (result) {
      this.copiedToClipboard.emit(`${this.ariaLabel} copied!`);
    } else {
      console.error(`Failed to copy ${this.ariaLabel}`);
    }
  }
}
