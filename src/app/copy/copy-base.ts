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
  protected _copyDefaults = {
    copyBtnTooltipText: 'Copy to Clipboard',
    tooltipCopiedText: 'Copied'
  };

  /**
   * Copy button aria label (announced to screen readers)
   */
  @Input('buttonAriaLabel') buttonAriaLabel: string;

  /**
   * A tooltip that describes the value to be copied
   */
  @Input('tooltipText') tooltipText: string;

  /**
   * Placement for the tooltip
   */
  @Input('tooltipPlacement') tooltipPlacement: string = 'top';

  /**
   * A tooltip that describes what the copy button does
   */
  @Input('copyBtnTooltipText') copyBtnTooltipText: string = this._copyDefaults.copyBtnTooltipText;

  /**
   * A tooltip that informs user that copy action recently occurred
   */
  @Input('tooltipCopiedText') tooltipCopiedText: string = this._copyDefaults.tooltipCopiedText;

  /**
   * Placement for the copy button tooltip
   */
  @Input('copyBtnTooltipPlacement') copyBtnTooltipPlacement: string = 'top';

  /**
   * The value to be copied to the clipboard
   */
  @Input('value') value: string;

  /**
   * A width to set on the copy container
   */
  @Input('width') width: string;

  /**
   * Event emitted when values are copied to the clipboard
   */
  @Output('onCopy') onCopy = new EventEmitter();

  private _recentlyCopied: boolean = false;

  /**
   * Default constructor
   */
  constructor(protected copyService: CopyService) {}

  /**
   * Returns the flag indicating copy action has just happened
   *
   * @returns {boolean} True if copy action has been triggered
   */
  get recentlyCopied(): boolean {
    return this._recentlyCopied;
  }

  /**
   * Copy given value to the clipboard
   */
  copy(): void {
    const result = this.copyService.copy(this.value),
      originalCopyBtnTooltipText = this.copyBtnTooltipText;
    if (result) {
      this.onCopy.emit({
        value: this.value
      } as CopyEvent);
      this._recentlyCopied = true;
      this.copyBtnTooltipText = this.tooltipCopiedText || this._copyDefaults.tooltipCopiedText;
      setTimeout(() => {
        this._recentlyCopied = false;
        this.copyBtnTooltipText = originalCopyBtnTooltipText || this._copyDefaults.copyBtnTooltipText;
      }, 3000);
    }
  }
}
