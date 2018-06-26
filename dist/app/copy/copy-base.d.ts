import { EventEmitter } from '@angular/core';
import { CopyEvent } from './copy-event';
import { CopyService } from './copy-service/copy.service';
/**
 * A config containing properties for copy components
 */
export declare abstract class CopyBase {
    protected copyService: CopyService;
    /**
     * Copy button aria label (announced to screen readers)
     */
    copyBtnAriaLabel: string;
    /**
     * The text node to be copied to the users clipboard
     */
    copyValue: string;
    /**
     * Tooltip text for the copyValue
     */
    tooltip: string;
    /**
     * Placement for the tooltip that further describes the copyValue
     */
    tooltipPlacement: string;
    /**
     * Event emitted with the chart reference after load is complete
     */
    onCopyToClipboard: EventEmitter<CopyEvent>;
    private _recentlyCopied;
    /**
     * Returns the flag indicating copy action has just happened
     *
     * @returns {boolean} True if copy action has been triggered
     */
    readonly recentlyCopied: boolean;
    /**
     * Default constructor
     */
    constructor(copyService: CopyService);
    /**
     * Copy value to the user's system clipboard
     */
    protected copyValueToClipboard(): void;
}
