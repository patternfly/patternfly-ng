import { PipeTransform } from '@angular/core';
/**
 * Search highlight pipe
 *
 * This is currently used with the type ahead feature of the filter fields component
 */
export declare class SearchHighlightPipe implements PipeTransform {
    transform(val: string, search: string): any;
    convertToOriginal(str: string, original: string): string;
}
