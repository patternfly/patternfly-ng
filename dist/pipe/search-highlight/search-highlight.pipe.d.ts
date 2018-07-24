import { PipeTransform } from '@angular/core';
/**
 * Search highlight pipe
 *
 * This is currently used with the type ahead feature of the filter fields component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SearchHighlightPipeModule } from 'patternfly-ng/pipe';
 * // Or
 * import { SearchHighlightPipeModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SearchHighlightPipeModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
export declare class SearchHighlightPipe implements PipeTransform {
    /**
     * Transform the substring matching the given search
     *
     * @param {string} val The string to highlight
     * @param {string} search The text to search for
     * @returns {any} The given string with highlighted text
     */
    transform(val: string, search: string): any;
    private convertToOriginal;
}
