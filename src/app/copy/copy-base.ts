import {
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CopyService } from './copy-service/copy.service';

  /**
   * A standard structure for result of copied to clipboard action
   */
export interface CopiedMsg {
  name: string;
  msg: string;
}

  /**
   * A config containing properties for copy components
   */
export abstract class CopyBase {
  /**
   * Copy button aria label (announced to screen readers)
   * @type {string}
   */
  @Input('copyBtnAriaLabel') copyBtnAriaLabel: string;

  /**
   * The text node to be copied to the users clipboard
   * @type {string}
   */
  @Input('copyValue') copyValue: string = 'Missing \'copyValue\' @Input property';

  /**
   * Tooltip text for the copyValue
   * @type {string}
   */
  @Input('tooltip') tooltip: string;

  /**
   * Placement for the tooltip that further describes the copyValue
   * @type {string}
   */
  @Input('tooltipPlacement') tooltipPlacement: string = 'top';

  /**
   * Event emitted with the chart reference after load is complete
   * @type {EventEmitter}
   */
  @Output('copiedToClipboard') copiedToClipboard: EventEmitter<CopiedMsg> = new EventEmitter();

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
   * @param {string} accessibleName An accessible name used to describe the component
   */
  protected copyValueToClipboard(accessibleName: string): void {
    let result = this.copyService.copy(this.copyValue);
    if (result) {
      this.copiedToClipboard.emit({
        name: accessibleName,
        msg: `${accessibleName} copied`
      } as CopiedMsg);
      this._recentlyCopied = true;
      setTimeout(() => {
        this._recentlyCopied = false;
      }, 3000);
    }
  }
}
