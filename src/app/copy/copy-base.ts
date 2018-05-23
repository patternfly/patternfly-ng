import {
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CopyService } from './copy-service/copy.service';

export abstract class CopyBase {
  @Input('copyBtnAriaLabel') copyBtnAriaLabel: string;
  @Input('copyValue') copyValue: string = 'Missing \'copyValue\' @Input property';
  @Input('tooltip') tooltip: string;
  @Input('tooltipPlacement') tooltipPlacement: string = 'top';

  /**
   * Event emitted with the chart reference after load is complete
   * @type {EventEmitter}
   */
  @Output('copiedToClipboard') copiedToClipboard: EventEmitter<any> = new EventEmitter();

  public recentlyCopied: boolean = false;

  /**
   * Default constructor
   */
  constructor(protected copyService: CopyService) {}

  /**
   * Copy value to the user's system clipboard
   */
  copyValueToClipboard(accessibleName: string): void {
    let result = this.copyService.copy(this.copyValue);
    if (result) {
      this.copiedToClipboard.emit(`${accessibleName} copied!`);
      this.recentlyCopied = true;
      setTimeout(() => {
        this.recentlyCopied = false;
      }, 3000);
    }
  }
}
