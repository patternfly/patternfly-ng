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
  @Input('token') token: string = 'Missing \'token\' @Input property';
  @Input('buttonLabel') buttonLabel: string = 'Copy';
  @Input('tokenPanelOpen') tokenPanelOpen: boolean = false;

  @Output('copiedToClipboard') copiedToClipboard = new EventEmitter();

  /**
   * Used to uniquly relate label to copy button
   */
  public hash: number = Math.floor(Math.random() * 10000);

  /**
   * The default constructor
   */
  constructor(private copyService: CopyService) {}

  /**
   * Toggle copy token panel open and close
   */
  toggleTokenPanel(): void {
    this.tokenPanelOpen = !this.tokenPanelOpen;
  }

  /**
   * Copy token to the user's system clipboard
   */
  copyTokenToClipboard(): void {
      let result = this.copyService.copy(this.token);
      if (result) {
        this.copiedToClipboard.emit(`${this.label} copied!`);
      } else {
        console.error(`Failed to copy ${this.label}`);
      }
  }

  /**
   * Define format for expand button's aria label
   */
  expandBtnAriaLabel(componentLabel: string): string {
    return `Expand ${componentLabel} Container`;
  }

  /**
   * Define format for copy button's aria label
   */
  copyBtnAriaLabel(componentLabel: string): string {
    return `Copy ${componentLabel}`;
  }

  ngOnInit() {
    if (!this.label) throw new Error('Missing required @Input property \'label\'');
  }
}
