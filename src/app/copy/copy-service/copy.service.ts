import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class CopyService {
  dom: Document;

  constructor(@Inject(DOCUMENT) dom: Document) {
    this.dom = dom;
  }

  /**
   * Copy value to the user's system clipboard
   */
  copy(value: string): boolean {
    let result = false;
    let textarea = this.dom.createElement('textarea');

    textarea.style.width = '0px';
    textarea.style.height = '0px';
    textarea.style.position = 'fixed';
    textarea.style.top = '-100px';
    textarea.style.left = '-100px';
    textarea.style.opacity = '0';
    textarea.value = value;

    this.dom.body.appendChild(textarea);
    textarea.select();

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

  private handleError(error: any): void {
    console.error(error);
  }
}
