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
  @Input('label') label: string;
  @Input('expandBtnAriaLabel') expandBtnAriaLabel: string;
  @Input('buttonLabel') buttonLabel: string = 'Copy';
  @Input('expanded') expanded: boolean = false;

  public uniqueID: string = uniqueId('pfng-block-copy-button-');

  constructor(protected copyService: CopyService) {
    super(copyService);
  }

  /**
   * Used to uniquly relate label to copy button
   */
  get copyBtnId(): string {
    return this.uniqueID;
  }

  /**
   * Toggle copyValue panel open and close
   */
  togglePanel(): void {
    this.expanded = !this.expanded;
  }

  copyValueToClipboard(): void {
    super.copyValueToClipboard(this.label);
  }
}
