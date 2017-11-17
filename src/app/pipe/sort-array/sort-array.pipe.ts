import { Pipe, PipeTransform } from '@angular/core';

/**
 * Sort array pipe
 *
 * This is currently used with the pin feature of the list component
 *
 * Example:
 * <div *ngFor="let item of (items | sortPin: 'name': true)">
 */
@Pipe({ name: 'sortArray'})
export class SortArrayPipe implements PipeTransform {
  /**
   * Sort array by property
   *
   * @param {Array<any>} arr Array to sort
   * @param prop Property name to sort by
   * @param {boolean} descending True to sort descending
   * @returns {any} Returns sorted array
   */
  transform(arr: Array<any>, prop: any, descending: boolean = false): any {
    if (arr === undefined) {
      return;
    }
    const m = descending ? -1 : 1;
    return arr.sort((a: any, b: any): number => {
      const x = a[prop];
      const y = b[prop];

      // return (x === y) ? 0 : (x < y) ? -1 * m : 1 * m;
      if (x === y) {
        return 0;
      } else if (x === undefined) {
        return -1 * m; // Account for undefined properties
      } else if (y === undefined) {
        return 1 * m; // Account for undefined properties
      } else {
        return (x < y) ? -1 * m : 1 * m;
      }
    });
  }
}
