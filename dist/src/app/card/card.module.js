var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CardAction } from './card-action/card-action';
import { CardActionComponent } from './card-action/card-action.component';
import { CardBase } from './card-base';
import { CardBaseConfig } from './card-base-config';
import { CardComponent } from './basic-card/card.component';
import { CardConfig } from './basic-card/card-config';
import { CardFilter } from './card-filter/card-filter';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { CardFilterPosition } from './card-filter/card-filter-position';
export { CardAction, CardBase, CardBaseConfig, CardConfig, CardFilter, CardFilterPosition };
/**
 * A module containing objects associated with card components
 */
var CardModule = (function () {
    function CardModule() {
    }
    return CardModule;
}());
CardModule = __decorate([
    NgModule({
        imports: [
            BsDropdownModule.forRoot(),
            CommonModule,
            FormsModule
        ],
        declarations: [CardActionComponent, CardComponent, CardFilterComponent],
        exports: [CardComponent, CardFilterComponent],
        providers: [BsDropdownConfig]
    })
], CardModule);
export { CardModule };
//# sourceMappingURL=card.module.js.map