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
    PipeModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    PipeModule.ctorParameters = function () { return []; };
    return PipeModule;
}());
export { PipeModule };
//# sourceMappingURL=pipe.module.js.map