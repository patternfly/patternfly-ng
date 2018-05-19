import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { CopyService } from '../copy-service/copy.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-block-copy',
  templateUrl: './block-copy.component.html',
  styleUrls: ['./block-copy.component.less']
})

export class BlockCopyComponent implements OnInit {
  @Input('label') label: string;
  @Input('copyBtnAriaLabel') copyBtnAriaLabel: string;
  @Input('expandBtnAriaLabel') expandBtnAriaLabel: string;
  @Input('tooltip') tooltip: string;
  @Input('copyValue') copyValue: string = 'Missing \'copyValue\' @Input property';
  @Input('buttonLabel') buttonLabel: string = 'Copy';
  @Input('expanded') expanded: boolean = false;

  @Output('copiedToClipboard') copiedToClipboard = new EventEmitter();

  /**
   * Used to uniquly relate label to copy button
   */
  public _hash: number = Math.floor(Math.random() * 10000);

  get hash(): number {
    return this._hash;
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
      } else {
        console.error(`Failed to copy ${this.label}`);
      }
  }

  ngOnInit() {
    if (!this.label) throw new Error('Missing required @Input property \'label\'');
    if (!this.copyBtnAriaLabel) this.copyBtnAriaLabel = this.label;
    if (!this.expandBtnAriaLabel) this.expandBtnAriaLabel = this.label;
  }
}
