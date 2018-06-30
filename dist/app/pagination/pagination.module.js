import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationConfig } from './pagination-config';
import { PaginationComponent } from './pagination.component';
import { PaginationEvent } from './pagination-event';
export { PaginationConfig, PaginationEvent };
/**
 * A module containing objects associated with notification components
 */
var PaginationModule = /** @class */ (function () {
    function PaginationModule() {
    }
    PaginationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [PaginationComponent],
                    exports: [PaginationComponent],
                    providers: [BsDropdownConfig]
                },] },
    ];
    /** @nocollapse */
    PaginationModule.ctorParameters = function () { return []; };
    return PaginationModule;
}());
export { PaginationModule };
//# sourceMappingURL=pagination.module.js.map