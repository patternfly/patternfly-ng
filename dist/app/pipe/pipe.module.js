var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { SearchHighlightPipeModule } from './search-highlight/search-highlight.pipe.module';
import { SearchHighlightPipe } from './search-highlight/search-highlight.pipe';
import { SortArrayPipeModule } from './sort-array/sort-array.pipe.module';
import { SortArrayPipe } from './sort-array/sort-array.pipe';
import { TruncatePipeModule } from './truncate/truncate.pipe.module';
import { TruncatePipe } from './truncate/truncate.pipe';
/**
 * A module containing objects associated with pipes
 *
 * @deprecated Use individual module imports
 *
 * import {
 *   SearchHighlightModule,
 *   SortArrayModule,
 *   TruncateModule
 * } from 'patternfly-ng/pipe';
 */
var PipeModule = /** @class */ (function () {
    function PipeModule() {
        console.log('patternfly-ng: PipeModule is deprecated; use SearchHighlightModule, ' +
            'SortArrayModule, or TruncateModule');
    }
    PipeModule = __decorate([
        NgModule({
            imports: [
                SearchHighlightPipeModule,
                SortArrayPipeModule,
                TruncatePipeModule
            ],
            exports: [
                SearchHighlightPipe,
                SortArrayPipe,
                TruncatePipe
            ]
        }),
        __metadata("design:paramtypes", [])
    ], PipeModule);
    return PipeModule;
}());
export { PipeModule };
//# sourceMappingURL=pipe.module.js.map