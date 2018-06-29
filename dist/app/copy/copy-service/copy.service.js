import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
var CopyService = /** @class */ (function () {
    /**
     * The default constructor
     */
    function CopyService(_dom) {
        this._dom = _dom;
        this.verbose = false;
    }
    Object.defineProperty(CopyService.prototype, "dom", {
        /**
         * Accessor for testing purposes only
         *
         * @returns {any}
         */
        get: function () {
            return this._dom;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copy a value to the user's system clipboard
     */
    CopyService.prototype.copy = function (value) {
        var result = false;
        var textarea = this.dom.createElement('textarea');
        var triggerElement = document.activeElement;
        textarea.style.width = '0px';
        textarea.style.height = '0px';
        textarea.style.position = 'fixed';
        textarea.style.top = '-100px';
        textarea.style.left = '-100px';
        textarea.style.opacity = '0';
        textarea.value = value;
        this.dom.body.appendChild(textarea);
        textarea.select();
        if (triggerElement !== undefined) {
            triggerElement.focus();
        }
        try {
            result = this.dom.execCommand('copy');
        }
        catch (error) {
            this.handleError(error);
        }
        finally {
            if (textarea.parentNode !== undefined) {
                textarea.parentNode.removeChild(textarea);
            }
        }
        return result;
    };
    /**
     * Set the verbose mode to on or off (default). During the verbose mode, each unsuccessful copy operation
     * will be printed to the console.
     * @param verbose Set to true for verbose mode
     */
    CopyService.prototype.setVerbose = function (verbose) {
        this.verbose = verbose;
    };
    /**
     * Handles an unsuccessful copy operation.
     * @param error The error message to display in the console.
     */
    CopyService.prototype.handleError = function (error) {
        if (this.verbose) {
            console.error(error);
        }
    };
    CopyService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CopyService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    return CopyService;
}());
export { CopyService };
//# sourceMappingURL=copy.service.js.map