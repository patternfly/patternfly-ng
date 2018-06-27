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
  @Input('buttonAriaLabel') buttonAriaLabel: string;

  /**
   * A tooltip that describes the value to be copied
   */
  @Input('tooltip') tooltip: string;

  /**
   * Placement for the tooltip
   */
  @Input('tooltipPlacement') tooltipPlacement: string = 'top';

  /**
   * The value to be copied to the clipboard
   */
  @Input('value') value: string;

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
    let result = this.copyService.copy(this.value);
    if (result) {
      this.onCopy.emit({
        value: this.value
      } as CopyEvent);
      this._recentlyCopied = true;
      setTimeout(() => {
        this._recentlyCopied = false;
      }, 3000);
    }
  }
}
