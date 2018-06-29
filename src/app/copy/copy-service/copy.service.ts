import {
  Inject,
  Injectable
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * A generic service for copying text to clipboard
 *
 * Usage:
 * <br/><code>import { CopyService } from 'patternfly-ng/copy';</code>
 *
 * Or:
 * <br/><code>import { CopyService } from 'patternfly-ng';</code>
 */
@Injectable()
export class CopyService {
  private verbose: boolean = false;

  /**
   * The default constructor
   */
  constructor(@Inject(DOCUMENT) private _dom: any) {}

  /**
   * Accessor for testing purposes only
   *
   * @returns {any}
   */
  get dom(): any {
    return this._dom;
  }

  /**
   * Copy a value to the user's system clipboard
   */
  copy(value: string): boolean {
    let result = false;
    let textarea = this.dom.createElement('textarea');
    const triggerElement = <HTMLElement>document.activeElement;

    textarea.style.width = '0px';
    textarea.style.height = '0px';
    textarea.style.position = 'fixed';
    textarea.style.top = '-100px';
    textarea.style.left = '-100px';
    textarea.style.opacity = '0';
    textarea.value = value;

    this.dom.body.appendChild(textarea);

    textarea.select();

    if (triggerElement !== undefined) {
      triggerElement.focus();
    }

    try {
      result = this.dom.execCommand('copy');
    } catch (error) {
      this.handleError(error);
    } finally {
      if (textarea.parentNode !== undefined) {
        textarea.parentNode.removeChild(textarea);
      }
    }
    return result;
  }

  /**
   * Set the verbose mode to on or off (default). During the verbose mode, each unsuccessful copy operation
   * will be printed to the console.
   * @param verbose Set to true for verbose mode
   */
  setVerbose(verbose: boolean): void {
    this.verbose = verbose;
  }

  /**
   * Handles an unsuccessful copy operation.
   * @param error The error message to display in the console.
   */
  private handleError(error: any): void {
    if (this.verbose) {
      console.error(error);
    }
  }
}
