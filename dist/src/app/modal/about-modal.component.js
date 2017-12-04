var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
import { AboutModalConfig } from './about-modal-config';
/**
 * Component for rendering AboutModal
 */
var AboutModalComponent = /** @class */ (function () {
    /**
     * The default contructor
     */
    function AboutModalComponent() {
        /**
         * The Event is emitted when modal is closed
         */
        this.onCancel = new EventEmitter();
        this.defaultConfig = {};
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    AboutModalComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    AboutModalComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Setup default config
     */
    AboutModalComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    /**
     * Close the Modal
     * @param  $event MouseEvent to emit
     */
    AboutModalComponent.prototype.close = function () {
        this.onCancel.emit({
            close: true
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", AboutModalConfig)
    ], AboutModalComponent.prototype, "config", void 0);
    __decorate([
        Output('onCancel'),
        __metadata("design:type", Object)
    ], AboutModalComponent.prototype, "onCancel", void 0);
    AboutModalComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-about-modal',
            template: "<div class=\"about-modal-pf\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" (click)=\"close()\" aria-hidden=\"true\"><span class=\"pficon pficon-close\"></span></button></div><div class=\"modal-body\"><h1 *ngIf=\"config.title\">{{config.title}}</h1><div *ngIf=\"config.productInfo && config.productInfo.length > 0\" class=\"product-versions-pf\"><ul class=\"list-unstyled\"><li *ngFor=\"let info of config.productInfo\"><strong>{{info.name}}</strong> {{info.value}}</li></ul></div><div class=\"product-versions-pf\"><ng-content></ng-content></div><div *ngIf=\"config.additionalInfo\" class=\"product-versions-pf\">{{config.additionalInfo}}</div><div *ngIf=\"config.copyright\" class=\"trademark-pf\">{{config.copyright}}</div></div><div class=\"modal-footer\"><img *ngIf=\"config.logoImageSrc\" [src]=\"config.logoImageSrc\" alt=\"{{config.logoImageAlt}}\"></div></div>"
        }),
        __metadata("design:paramtypes", [])
    ], AboutModalComponent);
    return AboutModalComponent;
}());
export { AboutModalComponent };
//# sourceMappingURL=about-modal.component.js.map