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
export declare class BlockCopyComponent extends CopyBase {
    protected copyService: CopyService;
    /**
     * Label output above the block copy component
     */
    label: string;
    /**
     * Copy button label
     */
    buttonLabel: string;
    /**
     * Flag indicating the expanded state for the expansion panel
     */
    expanded: boolean;
    /**
     * Aria label for the expansion toggle
     */
    expandToggleAriaLabel: string;
    /**
     * Generates a unique prefix for element IDs
     */
    protected uniqueID: string;
    /**
     * The default constructor
     */
    constructor(copyService: CopyService);
    /**
     * Generates a unique ID for the button
     */
    readonly buttonId: string;
    /**
     * Toggle expansion panel open and close
     */
    togglePanel(): void;
}
