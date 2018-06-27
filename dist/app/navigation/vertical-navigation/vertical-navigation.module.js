var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { VerticalNavigationComponent } from './vertical-navigation.component';
import { WindowReference } from '../../utilities/window.reference';
/**
 * A module containing objects associated with vertical navigation components
 */
var VerticalNavigationModule = /** @class */ (function () {
    function VerticalNavigationModule() {
    }
    VerticalNavigationModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                TooltipModule.forRoot()
            ],
            declarations: [VerticalNavigationComponent],
            exports: [VerticalNavigationComponent],
            providers: [TooltipConfig, WindowReference]
        })
    ], VerticalNavigationModule);
    return VerticalNavigationModule;
}());
export { VerticalNavigationModule };
//# sourceMappingURL=vertical-navigation.module.js.map