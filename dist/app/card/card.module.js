var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CardAction } from './card-action/card-action';
import { CardBase } from './card-base';
import { CardComponent } from './basic-card/card.component';
import { CardConfig } from './basic-card/card-config';
import { CardConfigBase } from './card-config-base';
import { CardFilter } from './card-filter/card-filter';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { CardFilterPosition } from './card-filter/card-filter-position';
import { InfoStatusCardComponent } from './info-status-card/info-status-card.component';
import { InfoStatusCardConfig } from './info-status-card/info-status-card-config';
import { InfoStatusCardModule } from './info-status-card/info-status-card.module';
import { CardActionModule } from './card-action/card-action.module';
import { CardModule as BasicCardModule } from './basic-card/card.module';
import { CardFilterModule } from './card-filter/card-filter.module';
export { CardAction, CardBase, CardConfig, CardConfigBase, CardFilter, CardFilterPosition, InfoStatusCardConfig };
/**
 * A module containing objects associated with card components
 *
 * @deprecated Use BasicCardModule or InfoStatusCardModule
 */
var CardModule = /** @class */ (function () {
    function CardModule() {
    }
    CardModule = __decorate([
        NgModule({
            imports: [
                BasicCardModule,
                CardActionModule,
                CardFilterModule,
                CommonModule,
                FormsModule,
                InfoStatusCardModule
            ],
            exports: [CardComponent, CardFilterComponent, InfoStatusCardComponent]
        })
    ], CardModule);
    return CardModule;
}());
export { CardModule };
//# sourceMappingURL=card.module.js.map