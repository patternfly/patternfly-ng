import { EventEmitter } from '@angular/core';
import { CopyService } from './copy-service/copy.service';
/**
 * A standard structure for result of copied to clipboard action
 */
export interface CopiedMsg {
    name: string;
    msg: string;
}
/**
 * A config containing properties for copy components
 */
export declare abstract class CopyBase {
    protected copyService: CopyService;
    /**
     * Copy button aria label (announced to screen readers)
     * @type {string}
     */
    copyBtnAriaLabel: string;
    /**
     * The text node to be copied to the users clipboard
     * @type {string}
     */
    copyValue: string;
    /**
     * Tooltip text for the copyValue
     * @type {string}
     */
    tooltip: string;
    /**
     * Placement for the tooltip that further describes the copyValue
     * @type {string}
     */
    tooltipPlacement: string;
    /**
     * Event emitted with the chart reference after load is complete
     * @type {EventEmitter}
     */
    copiedToClipboard: EventEmitter<CopiedMsg>;
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
     * @param {string} accessibleName An accessible name used to describe the component
     */
    protected copyValueToClipboard(accessibleName: string): void;
}
