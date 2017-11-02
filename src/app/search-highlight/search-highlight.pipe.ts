import { Pipe, PipeTransform } from '@angular/core';

/**
 * Search highlight pipe
 *
 * This is currently used with the type ahead feature of the filter fields component
 */
@Pipe({ name: 'SearchHighlight' })
export class SearchHighlightPipe implements PipeTransform {
  transform(val: string, search: string): any {
    if (search !== '' && search.length) {
      let lowerVal = val.toLowerCase();
      search = search.toLowerCase();
      if (!lowerVal) return '';
      else return this.convertToOriginal(lowerVal.split(search).join('<b>' + search + '</b>'), val);
    } else {
      return val;
    }
  }

  convertToOriginal(str: string, original: string): string {
    let output = '';
    let inTag = false;
    let j = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '<') {
        inTag = true;
        output += str[i];
      } else if (str[i] === '>') {
        inTag = false;
        output += str[i];
      } else if (!inTag) {
        output += original[j++];
      } else {
        output += str[i];
      }
    }
    return output;
  }
}
