import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CardFilterComponent } from './card-filter.component';
/**
 * A module containing objects associated with card filter components
 */
var CardFilterModule = /** @class */ (function () {
    function CardFilterModule() {
    }
    CardFilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [CardFilterComponent],
                    exports: [CardFilterComponent],
                    providers: [BsDropdownConfig]
                },] },
    ];
    /** @nocollapse */
    CardFilterModule.ctorParameters = function () { return []; };
    return CardFilterModule;
}());
export { CardFilterModule };
//# sourceMappingURL=card-filter.module.js.map