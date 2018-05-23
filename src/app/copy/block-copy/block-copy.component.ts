import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { uniqueId } from 'lodash';

// import { BlockCopyConfig } from './block-copy-config';

import { CopyService } from '../copy-service/copy.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-block-copy',
  templateUrl: './block-copy.component.html',
  styleUrls: ['./block-copy.component.less']
})

export class BlockCopyComponent {
  @Input('label') label: string;
  @Input('copyBtnAriaLabel') copyBtnAriaLabel: string;
  @Input('expandBtnAriaLabel') expandBtnAriaLabel: string;
  @Input('tooltip') tooltip: string;
  @Input('tooltipPlacement') tooltipPlacement: string = 'top';
  @Input('copyValue') copyValue: string = 'Missing \'copyValue\' @Input property';
  @Input('buttonLabel') buttonLabel: string = 'Copy';
  @Input('expanded') expanded: boolean = false;

  @Output('copiedToClipboard') copiedToClipboard = new EventEmitter();

  public uniqueID: string = uniqueId('pfng-block-copy-button-');

  /**
   * Used to uniquly relate label to copy button
   */
  get copyBtnId(): string {
    return this.uniqueID;
  }

  /**
   * The default constructor
   */
  constructor(private copyService: CopyService) {}

  /**
   * Toggle copyValue panel open and close
   */
  togglePanel(): void {
    this.expanded = !this.expanded;
  }

  /**
   * Copy copyValue to the user's system clipboard
   */
  copyValueToClipboard(): void {
    let result = this.copyService.copy(this.copyValue);
    if (result) {
      this.copiedToClipboard.emit(`${this.label} copied!`);
    }
  }

}
