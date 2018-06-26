import {
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CopyEvent } from './copy-event';
import { CopyService } from './copy-service/copy.service';

/**
 * A config containing properties for copy components
 */
export abstract class CopyBase {
  /**
   * Copy button aria label (announced to screen readers)
   */
  @Input('copyBtnAriaLabel') copyBtnAriaLabel: string;

  /**
   * The text node to be copied to the users clipboard
   */
  @Input('copyValue') copyValue: string;

  /**
   * Tooltip text for the copyValue
   */
  @Input('tooltip') tooltip: string;

  /**
   * Placement for the tooltip that further describes the copyValue
   */
  @Input('tooltipPlacement') tooltipPlacement: string = 'top';

  /**
   * Event emitted with the chart reference after load is complete
   */
  @Output('onCopyToClipboard') onCopyToClipboard: EventEmitter<CopyEvent> = new EventEmitter();

  private _recentlyCopied: boolean = false;

  /**
   * Returns the flag indicating copy action has just happened
   *
   * @returns {boolean} True if copy action has been triggered
   */
  public get recentlyCopied(): boolean {
    return this._recentlyCopied;
  }

  /**
   * Default constructor
   */
  constructor(protected copyService: CopyService) {}

  /**
   * Copy value to the user's system clipboard
   */
  protected copyValueToClipboard(): void {
    let result = this.copyService.copy(this.copyValue);
    if (result) {
      this.onCopyToClipboard.emit({
        value: this.copyValue
      } as CopyEvent);
      this._recentlyCopied = true;
      setTimeout(() => {
        this._recentlyCopied = false;
      }, 3000);
    }
  }
}
