var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import { orderBy } from 'lodash';
/**
 * Sort array pipe
 *
 * This is currently used with the pin feature of the list component
 *
 * Example:
 * <div *ngFor="let item of (items | sortPin: 'name': true)">
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
    SortArrayPipe = __decorate([
        Pipe({ name: 'sortArray' })
    ], SortArrayPipe);
    return SortArrayPipe;
}());
export { SortArrayPipe };
//# sourceMappingURL=sort-array.pipe.js.map