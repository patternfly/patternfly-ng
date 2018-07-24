import { EventEmitter } from '@angular/core';
import { CopyService } from './copy-service/copy.service';
/**
 * A config containing properties for copy components
 */
export declare abstract class CopyBase {
    protected copyService: CopyService;
    /**
     * Copy button aria label (announced to screen readers)
     */
    buttonAriaLabel: string;
    /**
     * A tooltip that describes the value to be copied
     */
    tooltip: string;
    /**
     * Placement for the tooltip
     */
    tooltipPlacement: string;
    /**
     * The value to be copied to the clipboard
     */
    value: string;
    /**
     * Event emitted when values are copied to the clipboard
     */
    onCopy: EventEmitter<{}>;
    private _recentlyCopied;
    /**
     * Default constructor
     */
    constructor(copyService: CopyService);
    /**
     * Returns the flag indicating copy action has just happened
     *
     * @returns {boolean} True if copy action has been triggered
     */
    readonly recentlyCopied: boolean;
    /**
     * Copy given value to the clipboard
     */
    copy(): void;
}
