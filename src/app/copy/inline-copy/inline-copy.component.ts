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
 * <code><pre>
 * // Individual module import
 * import { InlineCopyModule } from 'patternfly-ng/copy';
 * // Or
 * import { InlineCopyModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [InlineCopyModule,...]
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
