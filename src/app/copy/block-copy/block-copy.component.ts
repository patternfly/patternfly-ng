import {
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { uniqueId } from 'lodash';

import { CopyBase } from '../copy-base';
import { CopyService } from '../copy-service/copy.service';

/**
 * Block Copy component
 *
 * Usage:
 * <br/><code>import { BlockCopyModule } from 'patternfly-ng/copy';</code>
 *
 * Or:
 * <br/><code>import { BlockCopyModule } from 'patternfly-ng';</code>
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-block-copy',
  templateUrl: './block-copy.component.html',
  styleUrls: ['./block-copy.component.less']
})
export class BlockCopyComponent extends CopyBase {
  /**
   * Label output above the block copy component
   */
  @Input('label') label: string;

  /**
   * Copy button label
   */
  @Input('buttonLabel') buttonLabel: string;

  /**
   * Flag indicating the expanded state for the expansion panel
   */
  @Input('expanded') expanded: boolean = false;

  /**
   * Aria label for the expansion toggle
   */
  @Input('expandToggleAriaLabel') expandToggleAriaLabel: string;

  /**
   * Generates a unique prefix for element IDs
   */
  protected uniqueID: string = uniqueId('pfng-block-copy');

  /**
   * The default constructor
   */
  constructor(protected copyService: CopyService) {
    super(copyService);
  }

  /**
   * Generates a unique ID for the button
   */
  get buttonId(): string {
    return `${this.uniqueID}-button`;
  }

  /**
   * Toggle expansion panel open and close
   */
  togglePanel(): void {
    this.expanded = !this.expanded;
  }
}
