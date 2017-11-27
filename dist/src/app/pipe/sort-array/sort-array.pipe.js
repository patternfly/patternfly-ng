var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/**
 * Sort array pipe
 *
 * This is currently used with the pin feature of the list component
 *
 * Example:
 * <div *ngFor="let item of (items | sortPin: 'name': true)">
 */
var SortArrayPipe = (function () {
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
            return;
        }
        var m = descending ? -1 : 1;
        return arr.sort(function (a, b) {
            var x = a[prop];
            var y = b[prop];
            // return (x === y) ? 0 : (x < y) ? -1 * m : 1 * m;
            if (x === y) {
                return 0;
            }
            else if (x === undefined) {
                return -1 * m; // Account for undefined properties
            }
            else if (y === undefined) {
                return 1 * m; // Account for undefined properties
            }
            else {
                return (x < y) ? -1 * m : 1 * m;
            }
        });
    };
    return SortArrayPipe;
}());
SortArrayPipe = __decorate([
    Pipe({ name: 'sortArray' })
], SortArrayPipe);
export { SortArrayPipe };
//# sourceMappingURL=sort-array.pipe.js.map