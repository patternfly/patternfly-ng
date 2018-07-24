import { Pipe } from '@angular/core';
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
var SearchHighlightPipe = /** @class */ (function () {
    function SearchHighlightPipe() {
    }
    /**
     * Transform the substring matching the given search
     *
     * @param {string} val The string to highlight
     * @param {string} search The text to search for
     * @returns {any} The given string with highlighted text
     */
    SearchHighlightPipe.prototype.transform = function (val, search) {
        if (search !== undefined && search.length > 0) {
            var lowerVal = val.toLowerCase();
            search = search.toLowerCase();
            if (!lowerVal)
                return '';
            else
                return this.convertToOriginal(lowerVal.split(search).join('<b>' + search + '</b>'), val);
        }
        else {
            return val;
        }
    };
    SearchHighlightPipe.prototype.convertToOriginal = function (str, original) {
        var output = '';
        var inTag = false;
        var j = 0;
        for (var i = 0; i < str.length; i++) {
            if (str[i] === '<') {
                inTag = true;
                output += str[i];
            }
            else if (str[i] === '>') {
                inTag = false;
                output += str[i];
            }
            else if (!inTag) {
                output += original[j++];
            }
            else {
                output += str[i];
            }
        }
        return output;
    };
    SearchHighlightPipe.decorators = [
        { type: Pipe, args: [{ name: 'searchHighlight' },] },
    ];
    /** @nocollapse */
    SearchHighlightPipe.ctorParameters = function () { return []; };
    return SearchHighlightPipe;
}());
export { SearchHighlightPipe };
//# sourceMappingURL=search-highlight.pipe.js.map