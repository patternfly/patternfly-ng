var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CardFilter } from './card-filter';
import { CardFilterComponent } from './card-filter.component';
import { CardFilterPosition } from './card-filter-position';
export { CardFilter, CardFilterPosition };
/**
 * A module containing objects associated with card filter components
 */
var CardFilterModule = /** @class */ (function () {
    function CardFilterModule() {
    }
    CardFilterModule = __decorate([
        NgModule({
            imports: [
                BsDropdownModule.forRoot(),
                CommonModule,
                FormsModule
            ],
            declarations: [CardFilterComponent],
            exports: [CardFilterComponent],
            providers: [BsDropdownConfig]
        })
    ], CardFilterModule);
    return CardFilterModule;
}());
export { CardFilterModule };
//# sourceMappingURL=card-filter.module.js.map