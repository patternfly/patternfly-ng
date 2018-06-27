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
export declare class InlineCopyComponent extends CopyBase {
    protected copyService: CopyService;
    /**
     * The default constructor
     */
    constructor(copyService: CopyService);
}
