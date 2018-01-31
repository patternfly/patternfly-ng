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
    }
    /**
     * Initialize variable
     */
    ApplicationLauncherComponent.prototype.ngOnInit = function () {
        this._opened = false;
    };
    Object.defineProperty(ApplicationLauncherComponent.prototype, "opened", {
        /**
         * getter
         */
        get: function () {
            return this._opened;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * toggle function for launcher, active when click, return false on isDisabled:true
     */
    ApplicationLauncherComponent.prototype.toggle = function () {
        if (this.disabled) {
            return false;
        }
        else {
            this._opened = !this._opened;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ApplicationLauncherComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ApplicationLauncherComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ApplicationLauncherComponent.prototype, "showAsList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ApplicationLauncherComponent.prototype, "hiddenIcons", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ApplicationLauncherComponent.prototype, "items", void 0);
    ApplicationLauncherComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-application-launcher',
            template: "<div><div class=\"applauncher-pf dropdown dropdown-kebab-pf\" [ngClass]=\"{'applauncher-pf-block-list': !showAsList, 'open':opened}\" uib-dropdown uib-keyboard-nav=\"true\"><a id=\"domain-switcher\" class=\"dropdown-toggle drawer-pf-trigger-icon\" uib-dropdown-toggle (click)=\"toggle()\" [ngClass]=\"{'disabled': disabled}\"><i class=\"fa fa-th applauncher-pf-icon\" aria-hidden=\"true\"></i> <span class=\"applauncher-pf-title\">{{label || 'Application Launcher'}} <span class=\"caret\" aria-hidden=\"true\"></span></span></a><ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"domain-switcher\"><li class=\"applauncher-pf-item\" role=\"menuitem\" *ngFor=\"let item of items\"><a class=\"applauncher-pf-link\" href=\"{{item.url}}\" target=\"{{item.target || '_blank'}}\" *ngFor=\"let badge of item.badges\" title=\"{{badge.tooltip}}\"><i class=\"applauncher-pf-link-icon pficon\" class=\"{{item.iconStyleClass}}\" *ngIf=\"item.iconStyleClass\" [ngClass]=\"{hidden: hiddenIcons}\" aria-hidden=\"true\"></i> <span class=\"applauncher-pf-link-title\">{{item.title}}</span></a></li></ul></div></div>"
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