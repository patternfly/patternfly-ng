import { PipeTransform } from '@angular/core';
/**
 * Search highlight pipe
 *
 * This is currently used with the type ahead feature of the filter fields component
 */
export declare class SearchHighlightPipe implements PipeTransform {
    /**
     *
     * @param {string} val The string to highlight
     * @param {string} search The text to search for
     * @returns {any} The given string with highlighted text
     */
    transform(val: string, search: string): any;
    private convertToOriginal(str, original);
}
