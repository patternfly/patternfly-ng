import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RemainingCharsCountDirective } from './remaining-chars-count.directive';
/**
 * A module containing objects associated with the remaining characters directive
 */
var RemainingCharsCountModule = /** @class */ (function () {
    function RemainingCharsCountModule() {
    }
    RemainingCharsCountModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [RemainingCharsCountDirective],
                    exports: [RemainingCharsCountDirective]
                },] },
    ];
    /** @nocollapse */
    RemainingCharsCountModule.ctorParameters = function () { return []; };
    return RemainingCharsCountModule;
}());
export { RemainingCharsCountModule };
//# sourceMappingURL=remaining-chars-count.module.js.map