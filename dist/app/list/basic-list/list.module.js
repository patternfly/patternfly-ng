import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { ListComponent } from './list.component';
import { ListExpandToggleComponent } from './list-expand-toggle.component';
import { SortArrayPipeModule } from '../../pipe/sort-array/sort-array.pipe.module';
/**
 * A module containing objects associated with basic list components
 */
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        EmptyStateModule,
                        FormsModule,
                        SortArrayPipeModule
                    ],
                    declarations: [ListComponent, ListExpandToggleComponent],
                    exports: [ListComponent, ListExpandToggleComponent]
                },] },
    ];
    /** @nocollapse */
    ListModule.ctorParameters = function () { return []; };
    return ListModule;
}());
export { ListModule };
//# sourceMappingURL=list.module.js.map