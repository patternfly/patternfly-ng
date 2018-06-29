import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SampleComponent } from './sample.component';
/**
 * A module containing objects associated with the sample component
 */
var SampleModule = /** @class */ (function () {
    function SampleModule() {
    }
    SampleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [SampleComponent],
                    exports: [SampleComponent]
                },] },
    ];
    /** @nocollapse */
    SampleModule.ctorParameters = function () { return []; };
    return SampleModule;
}());
export { SampleModule };
//# sourceMappingURL=sample.module.js.map