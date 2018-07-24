/**
 * A generic service for copying text to clipboard
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { CopyService } from 'patternfly-ng/copy';
 * // Or
 * import { CopyService } from 'patternfly-ng';
 * </pre></code>
 */
export declare class CopyService {
    private _dom;
    private verbose;
    /**
     * The default constructor
     */
    constructor(_dom: any);
    /**
     * Accessor for testing purposes only
     *
     * @returns {any}
     */
    readonly dom: any;
    /**
     * Copy a value to the user's system clipboard
     */
    copy(value: string): boolean;
    /**
     * Set the verbose mode to on or off (default). During the verbose mode, each unsuccessful copy operation
     * will be printed to the console.
     * @param verbose Set to true for verbose mode
     */
    setVerbose(verbose: boolean): void;
    /**
     * Handles an unsuccessful copy operation.
     * @param error The error message to display in the console.
     */
    private handleError;
}
