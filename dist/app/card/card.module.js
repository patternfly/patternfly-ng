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
import { CardAction } from './card-action/card-action';
import { CardActionComponent } from './card-action/card-action.component';
import { CardBase } from './card-base';
import { CardComponent } from './basic-card/card.component';
import { CardConfig } from './basic-card/card-config';
import { CardConfigBase } from './card-config-base';
import { CardFilter } from './card-filter/card-filter';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { CardFilterPosition } from './card-filter/card-filter-position';
import { InfoStatusCardConfig } from './info-status-card/info-status-card-config';
import { InfoStatusCardComponent } from './info-status-card/info-status-card.component';
export { CardAction, CardBase, CardConfig, CardConfigBase, CardFilter, CardFilterPosition, InfoStatusCardConfig };
/**
 * A module containing objects associated with card components
 */
var CardModule = /** @class */ (function () {
    function CardModule() {
    }
    CardModule = __decorate([
        NgModule({
            imports: [
                BsDropdownModule.forRoot(),
                CommonModule,
                FormsModule
            ],
            declarations: [CardActionComponent, CardComponent, CardFilterComponent, InfoStatusCardComponent],
            exports: [CardComponent, CardFilterComponent, InfoStatusCardComponent],
            providers: [BsDropdownConfig]
        })
    ], CardModule);
    return CardModule;
}());
export { CardModule };
//# sourceMappingURL=card.module.js.map