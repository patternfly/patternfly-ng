import {
  Component,
  EventEmitter,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { uniqueId } from 'lodash';

import { CopyBase } from '../copy-base';

import { CopyService } from '../copy-service/copy.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-block-copy',
  templateUrl: './block-copy.component.html',
  styleUrls: ['./block-copy.component.less']
})

export class BlockCopyComponent extends CopyBase {
  /**
   * Label naming the block copy component
   */
  @Input('label') label: string;

  /**
   * Copy button text
   */
  @Input('buttonLabel') buttonLabel: string = 'Copy';

  /**
   * Controls the expanded state of block copy
   */
  @Input('expanded') expanded: boolean = false;

  /**
   * Expand/toggle button aria label (announced to screen readers)
   */
  @Input('expandBtnAriaLabel') expandBtnAriaLabel: string;

  /**
   * Generates a unique value for an id
   */
  public uniqueID: string = uniqueId('pfng-block-copy');

  constructor(protected copyService: CopyService) {
    super(copyService);
  }

  /**
   * Used to uniquly relate label to copy button
   */
  get copyBtnId(): string {
    return `${this.uniqueID}-button`;
  }

  /**
   * Toggle copyValue panel open and close
   */
  togglePanel(): void {
    this.expanded = !this.expanded;
  }

  /**
   * Copies the label value to the users clipboard
   */
  copyValueToClipboard(): void {
    super.copyValueToClipboard(this.label);
  }
}
