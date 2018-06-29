import { EventEmitter, Input, Output, } from '@angular/core';
/**
 * A config containing properties for copy components
 */
var CopyBase = /** @class */ (function () {
    /**
     * Default constructor
     */
    function CopyBase(copyService) {
        this.copyService = copyService;
        /**
         * Placement for the tooltip
         */
        this.tooltipPlacement = 'top';
        /**
         * Event emitted when values are copied to the clipboard
         */
        this.onCopy = new EventEmitter();
        this._recentlyCopied = false;
    }
    Object.defineProperty(CopyBase.prototype, "recentlyCopied", {
        /**
         * Returns the flag indicating copy action has just happened
         *
         * @returns {boolean} True if copy action has been triggered
         */
        get: function () {
            return this._recentlyCopied;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copy given value to the clipboard
     */
    CopyBase.prototype.copy = function () {
        var _this = this;
        var result = this.copyService.copy(this.value);
        if (result) {
            this.onCopy.emit({
                value: this.value
            });
            this._recentlyCopied = true;
            setTimeout(function () {
                _this._recentlyCopied = false;
            }, 3000);
        }
    };
    CopyBase.propDecorators = {
        'buttonAriaLabel': [{ type: Input, args: ['buttonAriaLabel',] },],
        'tooltip': [{ type: Input, args: ['tooltip',] },],
        'tooltipPlacement': [{ type: Input, args: ['tooltipPlacement',] },],
        'value': [{ type: Input, args: ['value',] },],
        'onCopy': [{ type: Output, args: ['onCopy',] },],
    };
    return CopyBase;
}());
export { CopyBase };
//# sourceMappingURL=copy-base.js.map