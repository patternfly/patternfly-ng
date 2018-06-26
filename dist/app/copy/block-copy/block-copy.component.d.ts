import { CopyBase } from '../copy-base';
import { CopyService } from '../copy-service/copy.service';
export declare class BlockCopyComponent extends CopyBase {
    protected copyService: CopyService;
    /**
     * Label naming the block copy component
     */
    label: string;
    /**
     * Copy button text
     */
    buttonLabel: string;
    /**
     * Controls the expanded state of block copy
     */
    expanded: boolean;
    /**
     * Expand/toggle button aria label (announced to screen readers)
     */
    expandBtnAriaLabel: string;
    /**
     * Generates a unique value for an id
     */
    uniqueID: string;
    /**
     * The default constructor
     */
    constructor(copyService: CopyService);
    /**
     * Used to uniquly relate label to copy button
     */
    readonly copyBtnId: string;
    /**
     * Toggle copyValue panel open and close
     */
    togglePanel(): void;
    /**
     * Copies the label value to the users clipboard
     */
    copyToClipboard(): void;
}
