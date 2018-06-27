import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { CopyBase } from '../copy-base';
import { CopyService } from '../copy-service/copy.service';

/**
 * Inline Copy component
 *
 * Usage:
 * <br/><code>import { InlineCopyModule } from 'patternfly-ng/copy';</code>
 *
 * Or:
 * <br/><code>import { InlineCopyModule } from 'patternfly-ng';</code>
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-inline-copy',
  templateUrl: './inline-copy.component.html'
})
export class InlineCopyComponent extends CopyBase {
  /**
   * The default constructor
   */
  constructor(protected copyService: CopyService) {
    super(copyService);
  }
}
