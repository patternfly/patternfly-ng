var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/**
 * Search highlight pipe
 *
 * This is currently used with the type ahead feature of the filter fields component
 */
var SearchHighlightPipe = (function () {
    function SearchHighlightPipe() {
    }
    SearchHighlightPipe.prototype.transform = function (val, search) {
        if (search !== '' && search.length) {
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
    return SearchHighlightPipe;
}());
SearchHighlightPipe = __decorate([
    Pipe({ name: 'SearchHighlight' })
], SearchHighlightPipe);
export { SearchHighlightPipe };
//# sourceMappingURL=search-highlight.pipe.js.map