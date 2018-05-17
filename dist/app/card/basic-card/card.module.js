var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CardActionModule } from '../card-action/card-action.module';
import { CardComponent } from '../basic-card/card.component';
import { CardConfig } from '../basic-card/card-config';
import { CardFilterModule } from '../card-filter/card-filter.module';
export { CardConfig };
/**
 * A module containing objects associated with basic card components
 */
var CardModule = /** @class */ (function () {
    function CardModule() {
    }
    CardModule = __decorate([
        NgModule({
            imports: [
                CardActionModule,
                CardFilterModule,
                CommonModule,
                FormsModule
            ],
            declarations: [CardComponent],
            exports: [CardComponent]
        })
    ], CardModule);
    return CardModule;
}());
export { CardModule };
//# sourceMappingURL=card.module.js.map