import {
  Component,
  EventEmitter,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { CopyBase } from '../copy-base';
// import { InlineCopyConfig } from './inline-copy-config';

import { CopyService } from '../copy-service/copy.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-inline-copy',
  templateUrl: './inline-copy.component.html',
  styleUrls: ['./inline-copy.component.less']
})

export class InlineCopyComponent extends CopyBase implements OnInit {

  constructor(protected copyService: CopyService) {
    super(copyService);
  }

  ngOnInit(): void {}

  copyValueToClipboard(): void {
    super.copyValueToClipboard(this.copyBtnAriaLabel);
  }
}
