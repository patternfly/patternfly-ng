import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { FilterComponent } from './filter.component';
import { FilterFieldsComponent } from './filter-fields.component';
import { FilterResultsComponent } from './filter-results.component';
import { SearchHighlightPipeModule } from '../pipe/search-highlight/search-highlight.pipe.module';
import { TruncatePipeModule } from '../pipe/truncate/truncate.pipe.module';
/**
 * A module containing objects associated with filter components
 */
var FilterModule = /** @class */ (function () {
    function FilterModule() {
    }
    FilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        CommonModule,
                        FormsModule,
                        PopoverModule.forRoot(),
                        SearchHighlightPipeModule,
                        TooltipModule.forRoot(),
                        TruncatePipeModule
                    ],
                    declarations: [FilterComponent, FilterFieldsComponent, FilterResultsComponent],
                    exports: [FilterComponent, FilterFieldsComponent, FilterResultsComponent],
                    providers: [BsDropdownConfig, TooltipConfig]
                },] },
    ];
    /** @nocollapse */
    FilterModule.ctorParameters = function () { return []; };
    return FilterModule;
}());
export { FilterModule };
//# sourceMappingURL=filter.module.js.map