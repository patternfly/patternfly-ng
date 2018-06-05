import {
  Component,
  EventEmitter,
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

  constructor(protected copyService: CopyService) {
    super(copyService);
  }

  public copyValueToClipboard(): void {
    super.copyValueToClipboard(this.copyBtnAriaLabel);
  }
}
