import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CardActionComponent } from './card-action.component';
/**
 * A module containing objects associated with card action components
 */
var CardActionModule = /** @class */ (function () {
    function CardActionModule() {
    }
    CardActionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [CardActionComponent],
                    exports: [CardActionComponent]
                },] },
    ];
    /** @nocollapse */
    CardActionModule.ctorParameters = function () { return []; };
    return CardActionModule;
}());
export { CardActionModule };
//# sourceMappingURL=card-action.module.js.map