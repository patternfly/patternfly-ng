var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
import { InfoStatusCardConfig } from './info-status-card-config';
/**
 * Info Status Card Component
 */
var InfoStatusCardComponent = (function () {
    /**
     * The default constructor
     */
    function InfoStatusCardComponent() {
        this.defaultConfig = {
            showTopBorder: false,
            htmlContent: true
        };
    }
    /**
     *  Setup component configuration upon initialization
     */
    InfoStatusCardComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if any component config props have changed
     */
    InfoStatusCardComponent.prototype.ngDoCheck = function () {
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    InfoStatusCardComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    return InfoStatusCardComponent;
}());
__decorate([
    Input('config'),
    __metadata("design:type", InfoStatusCardConfig)
], InfoStatusCardComponent.prototype, "config", void 0);
InfoStatusCardComponent = __decorate([
    Component({
        selector: 'pfng-info-status-card',
        template: "<div class=\"card-pf card-pf-info-status\" [class.card-pf-accented]=\"config.showTopBorder\"><div class=\"card-pf-info-image\"><img *ngIf=\"config.iconImageSrc\" src=\"{{config.iconImageSrc}}\" alt=\"\" class=\"info-img\"> <span class=\"info-icon {{config.iconStyleClass}}\"></span></div><div class=\"card-pf-info-content\"><h2 *ngIf=\"config.title\" class=\"card-pf-title\"><a *ngIf=\"config.href\" href=\"{{config.href}}\"><span>{{config.title}}</span> </a><span *ngIf=\"!config.href\"><span>{{config.title}}</span></span></h2><ng-container *ngIf=\"config.htmlContent !== undefined\"><div *ngIf=\"config.htmlContent; then showHtmlContent else showPlainTextContent\"></div><ng-template #showHtmlContent><div [innerHTML]=\"item\" class=\"card-pf-info-item\" *ngFor=\"let item of config.info\"></div></ng-template><ng-template #showPlainTextContent><div class=\"card-pf-info-item\" *ngFor=\"let item of config.info\">{{item}}</div></ng-template></ng-container></div></div>",
        styles: [".card-pf-info-status{display:-webkit-box;display:-ms-flexbox;display:flex;margin:0 10px}.card-pf-info-status .card-pf-info-image{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-right:15px}.card-pf-info-status .card-pf-info-image .info-icon{font-size:50px}.card-pf-info-status .card-pf-info-image .info-img{max-height:50px}.card-pf-info-status .card-pf-info-content{margin:10px 0}.card-pf-info-status .card-pf-info-content .card-pf-title{margin-top:10px;margin-bottom:15px}"]
    }),
    __metadata("design:paramtypes", [])
], InfoStatusCardComponent);
export { InfoStatusCardComponent };
//# sourceMappingURL=info-status-card.component.js.map