import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { CopyBase } from '../copy-base';

import { CopyService } from '../copy-service/copy.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-inline-copy',
  templateUrl: './inline-copy.component.html',
  styleUrls: ['./inline-copy.component.less']
})

export class InlineCopyComponent extends CopyBase {

  /**
   * The default constructor
   */
  constructor(protected copyService: CopyService) {
    super(copyService);
  }

  /**
   * Copies the copyBtnAriaLabel value to the users clipboard
   */
  copyToClipboard(): void {
    this.copyValueToClipboard(this.copyBtnAriaLabel);
  }
}
