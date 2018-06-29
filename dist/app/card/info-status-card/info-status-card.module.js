import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { InfoStatusCardComponent } from './info-status-card.component';
/**
 * A module containing objects associated with info status card components
 */
var InfoStatusCardModule = /** @class */ (function () {
    function InfoStatusCardModule() {
    }
    InfoStatusCardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [InfoStatusCardComponent],
                    exports: [InfoStatusCardComponent]
                },] },
    ];
    /** @nocollapse */
    InfoStatusCardModule.ctorParameters = function () { return []; };
    return InfoStatusCardModule;
}());
export { InfoStatusCardModule };
//# sourceMappingURL=info-status-card.module.js.map