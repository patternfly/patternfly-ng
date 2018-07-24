import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmptyStateComponent } from './empty-state.component';
/**
 * A module containing objects associated with the empty state component
 */
var EmptyStateModule = /** @class */ (function () {
    function EmptyStateModule() {
    }
    EmptyStateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [EmptyStateComponent],
                    exports: [EmptyStateComponent]
                },] },
    ];
    /** @nocollapse */
    EmptyStateModule.ctorParameters = function () { return []; };
    return EmptyStateModule;
}());
export { EmptyStateModule };
//# sourceMappingURL=empty-state.module.js.map