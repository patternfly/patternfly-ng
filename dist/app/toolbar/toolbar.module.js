import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ActionModule } from '../action/action.module';
import { FilterModule } from '../filter/filter.module';
import { SortModule } from '../sort/sort.module';
import { ToolbarComponent } from './toolbar.component';
/**
 * A module containing objects associated with the toolbar component
 */
var ToolbarModule = /** @class */ (function () {
    function ToolbarModule() {
    }
    ToolbarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        ActionModule,
                        BsDropdownModule.forRoot(),
                        CommonModule,
                        FilterModule,
                        SortModule
                    ],
                    declarations: [ToolbarComponent],
                    exports: [ToolbarComponent],
                    providers: [BsDropdownConfig]
                },] },
    ];
    /** @nocollapse */
    ToolbarModule.ctorParameters = function () { return []; };
    return ToolbarModule;
}());
export { ToolbarModule };
//# sourceMappingURL=toolbar.module.js.map