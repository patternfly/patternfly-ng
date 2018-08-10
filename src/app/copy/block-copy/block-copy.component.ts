import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { uniqueId } from 'lodash';

import { CopyBase } from '../copy-base';
import { CopyService } from '../copy-service/copy.service';

/**
 * Block Copy component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { BlockCopyModule } from 'patternfly-ng/copy';
 * // Or
 * import { BlockCopyModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [BlockCopyModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CopyEvent } from 'patternfly-ng/copy';
 * </pre></code>
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-block-copy',
  templateUrl: './block-copy.component.html'
})
export class BlockCopyComponent extends CopyBase implements OnInit {
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

  ngOnInit() {
    if (!this.buttonAriaLabel && this.buttonLabel) {
      this.buttonAriaLabel = this.buttonLabel;
    }
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
