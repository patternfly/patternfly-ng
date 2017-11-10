import { Pipe, PipeTransform } from '@angular/core';
import { isBoolean, isString } from 'util';

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
      let x = a[prop];
      let y = b[prop];

      // Resolve undefined values for more predicable behavior
      if (x === undefined && isBoolean(y)) {
        x = false;
      } else if (x === undefined && isString(y)) {
        x = '';
      }
      if (y === undefined && isBoolean(x)) {
        y = false;
      } else if (y === undefined && isString(x)) {
        y = '';
      }
      return (x === y) ? 0 : (x < y) ? -1 * m : 1 * m;
    });
  }
}
