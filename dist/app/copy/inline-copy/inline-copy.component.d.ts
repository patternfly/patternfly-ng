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
export declare class InlineCopyComponent extends CopyBase {
    protected copyService: CopyService;
    /**
     * The default constructor
     */
    constructor(copyService: CopyService);
}
