var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { SearchHighlightPipe } from './search-highlight/search-highlight.pipe';
import { SortArrayPipe } from './sort-array/sort-array.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
/**
 * A module containing objects associated with pipes
 */
var PipeModule = /** @class */ (function () {
    function PipeModule() {
    }
    PipeModule = __decorate([
        NgModule({
            declarations: [
                SearchHighlightPipe,
                SortArrayPipe,
                TruncatePipe
            ],
            exports: [
                SearchHighlightPipe,
                SortArrayPipe,
                TruncatePipe
            ]
        })
    ], PipeModule);
    return PipeModule;
}());
export { PipeModule };
//# sourceMappingURL=pipe.module.js.map