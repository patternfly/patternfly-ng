import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

// import { InlineCopyConfig } from './inline-copy-config';

import { CopyService } from '../copy-service/copy.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-inline-copy',
  templateUrl: './inline-copy.component.html',
  styleUrls: ['./inline-copy.component.less']
})

export class InlineCopyComponent implements OnInit {
  @Input('copyBtnAriaLabel') copyBtnAriaLabel: string;
  @Input('copyValue') copyValue: string = 'Missing \'copyValue\' @Input property';
  @Input('tooltip') tooltip: string;
  @Input('tooltipPlacement') tooltipPlacement: string = 'top';

  @Output('copiedToClipboard') copiedToClipboard = new EventEmitter();

  /**
   * The default constructor
   */
  constructor(private copyService: CopyService) {}

  ngOnInit(): void {}

  /**
   * Copy value to the user's system clipboard
   */
  copyValueToClipboard(): void {
    let result = this.copyService.copy(this.copyValue);
    if (result) {
      this.copiedToClipboard.emit(`${this.copyBtnAriaLabel} copied!`);
    } else {
      console.error(`Failed to copy ${this.copyBtnAriaLabel}`);
    }
  }
}
