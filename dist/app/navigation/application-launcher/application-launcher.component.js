var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation } from '@angular/core';
var ApplicationLauncherComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ApplicationLauncherComponent() {
        /**
         * Display items as a list instead of a grid, default: false
         */
        this.showAsList = false;
        /**
         * Flag to show icons on the launcher, default: true
         */
        this.showIcons = true;
    }
    /**
     * Initialize variable
     */
    ApplicationLauncherComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ApplicationLauncherComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ApplicationLauncherComponent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ApplicationLauncherComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ApplicationLauncherComponent.prototype, "showAsList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ApplicationLauncherComponent.prototype, "showIcons", void 0);
    ApplicationLauncherComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-application-launcher',
            template: "<div><div class=\"applauncher-pf dropdown dropdown-kebab-pf\" dropdown [ngClass]=\"{'applauncher-pf-block-list': !showAsList}\"><a class=\"dropdown-toggle drawer-pf-trigger-icon\" href=\"javascript:void(0)\" dropdownToggle *ngIf=\"!disabled\"><i class=\"fa fa-th applauncher-pf-icon\" aria-hidden=\"true\"></i> <span class=\"applauncher-pf-title\">{{label || 'Application Launcher'}} <span class=\"caret\" aria-hidden=\"true\"></span> </span></a><a class=\"dropdown-toggle drawer-pf-trigger-icon disabled\" href=\"javascript:void(0)\" onclick=\"return false;\" *ngIf=\"disabled\"><i class=\"fa fa-th applauncher-pf-icon\" aria-hidden=\"true\"></i> <span class=\"applauncher-pf-title\">{{label || 'Application Launcher'}} <span class=\"caret\" aria-hidden=\"true\"></span></span></a><ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\" *dropdownMenu><li class=\"applauncher-pf-item\" *ngFor=\"let item of items\"><a class=\"applauncher-pf-link\" href=\"{{item.url}}\" target=\"{{item.target || '_blank'}}\" title=\"{{badge.tooltip}}\" role=\"menuitem\" *ngFor=\"let badge of item.badges\"><i class=\"applauncher-pf-link-icon pficon {{item.iconStyleClass}}\" aria-hidden=\"true\" [ngClass]=\"{hidden: !showIcons}\" *ngIf=\"item.iconStyleClass\"></i> <span class=\"applauncher-pf-link-title\">{{item.title}}</span></a></li></ul></div></div>"
        })
        /**
         * Application launcher component
         */
        ,
        __metadata("design:paramtypes", [])
    ], ApplicationLauncherComponent);
    return ApplicationLauncherComponent;
}());
export { ApplicationLauncherComponent };
//# sourceMappingURL=application-launcher.component.js.map