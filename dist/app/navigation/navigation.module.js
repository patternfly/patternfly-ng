var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApplicationLauncherComponent } from './application-launcher/application-launcher.component';
import { ApplicationLauncherModule } from './application-launcher/application-launcher.module';
import { NavigationItemConfig } from './navigation-item-config';
import { VerticalNavigationComponent } from './vertical-navigation/vertical-navigation.component';
import { VerticalNavigationModule } from './vertical-navigation/vertical-navigation.module';
export { NavigationItemConfig };
/**
 * A module containing objects associated with the navigation components
 *
 * @deprecated Use individual module imports
 *
 * import {
 *   ApplicationLauncherModule,
 *   VerticalNavigationModule
 * } from 'patternfly-ng/navigation';
 */
var NavigationModule = /** @class */ (function () {
    function NavigationModule() {
        console.log('patternfly-ng: NavigationModule is deprecated; use ApplicationLauncherModule ' +
            'or VerticalNavigationModule');
    }
    NavigationModule = __decorate([
        NgModule({
            imports: [
                ApplicationLauncherModule,
                CommonModule,
                VerticalNavigationModule
            ],
            exports: [ApplicationLauncherComponent, VerticalNavigationComponent]
        }),
        __metadata("design:paramtypes", [])
    ], NavigationModule);
    return NavigationModule;
}());
export { NavigationModule };
//# sourceMappingURL=navigation.module.js.map