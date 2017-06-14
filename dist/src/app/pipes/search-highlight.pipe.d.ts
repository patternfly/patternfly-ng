import { PipeTransform } from '@angular/core';
export declare class SearchHighlight implements PipeTransform {
    transform(val: string, search: string): any;
    convertToOriginal(str: string, original: string): string;
}
