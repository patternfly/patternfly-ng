import { Pipe } from '@angular/core';
import { orderBy } from 'lodash';
/**
 * Sort array pipe
 *
 * This is currently used with the pin feature of the list component
 *
 * Example:
 * <div *ngFor="let item of (items | sortPin: 'name': true)">
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SortArrayPipeModule } from 'patternfly-ng/pipe';
 * // Or
 * import { SortArrayPipeModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SortArrayPipeModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var SortArrayPipe = /** @class */ (function () {
    function SortArrayPipe() {
    }
    /**
     * Sort array by property
     *
     * @param {Array<any>} arr Array to sort
     * @param prop Property name to sort by
     * @param {boolean} descending True to sort descending
     * @returns {any} Returns sorted array
     */
    SortArrayPipe.prototype.transform = function (arr, prop, descending) {
        if (descending === void 0) { descending = false; }
        if (arr === undefined) {
            return arr;
        }
        var sortOrder = descending ? 'desc' : 'asc';
        var sortedArray = orderBy(arr, [prop], [sortOrder]);
        return sortedArray;
    };
    SortArrayPipe.decorators = [
        { type: Pipe, args: [{ name: 'sortArray' },] },
    ];
    /** @nocollapse */
    SortArrayPipe.ctorParameters = function () { return []; };
    return SortArrayPipe;
}());
export { SortArrayPipe };
//# sourceMappingURL=sort-array.pipe.js.map