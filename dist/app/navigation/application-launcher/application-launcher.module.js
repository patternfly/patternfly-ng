var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ApplicationLauncherComponent } from './application-launcher.component';
/**
 * A module containing objects associated with the application laucnher components
 */
var ApplicationLauncherModule = /** @class */ (function () {
    function ApplicationLauncherModule() {
    }
    ApplicationLauncherModule = __decorate([
        NgModule({
            imports: [
                BsDropdownModule.forRoot(),
                CommonModule
            ],
            declarations: [ApplicationLauncherComponent],
            exports: [ApplicationLauncherComponent],
            providers: [BsDropdownConfig]
        })
    ], ApplicationLauncherModule);
    return ApplicationLauncherModule;
}());
export { ApplicationLauncherModule };
//# sourceMappingURL=application-launcher.module.js.map