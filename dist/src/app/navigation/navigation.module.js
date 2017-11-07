var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { VerticalNavigationComponent } from './vertical-navigation.component';
import { NavigationItemConfig } from './navigation-item-config';
import { WindowReference } from '../utilities/window.reference';
export { NavigationItemConfig };
/**
 * A module containing objects associated with the navigation components
 */
var NavigationModule = (function () {
    function NavigationModule() {
    }
    return NavigationModule;
}());
NavigationModule = __decorate([
    NgModule({
        imports: [CommonModule, TooltipModule.forRoot()],
        declarations: [VerticalNavigationComponent],
        exports: [VerticalNavigationComponent],
        providers: [TooltipConfig, WindowReference]
    })
], NavigationModule);
export { NavigationModule };
//# sourceMappingURL=navigation.module.js.map