import { Pipe } from '@angular/core';
/**
 * Truncate pipe
 *
 * This is currently used with the save filter feature of the filter fields component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { TruncatePipeModule } from 'patternfly-ng/pipe';
 * // Or
 * import { TruncatePipeModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [TruncatePipeModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var TruncatePipe = /** @class */ (function () {
    function TruncatePipe() {
    }
    /**
     * Truncate given string
     *
     * @param {string} value The string to truncate
     * @param {string} limit The number of characters to truncate the string at
     * @param {string} trail The trailing characters representing truncation
     * @returns {string} The truncated string
     */
    TruncatePipe.prototype.transform = function (value, limit, trail) {
        if (limit === void 0) { limit = 10; }
        if (trail === void 0) { trail = '...'; }
        return (value.length > limit) ? value.substring(0, limit) + trail : value;
    };
    TruncatePipe.decorators = [
        { type: Pipe, args: [{ name: 'truncate' },] },
    ];
    /** @nocollapse */
    TruncatePipe.ctorParameters = function () { return []; };
    return TruncatePipe;
}());
export { TruncatePipe };
//# sourceMappingURL=truncate.pipe.js.map