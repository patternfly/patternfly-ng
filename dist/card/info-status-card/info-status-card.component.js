import { Component, Input, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
/**
 * Info Status Card Component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { InfoStatusCardModule } from 'patternfly-ng/card';
 * // Or
 * import { InfoStatusCardModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [InfoStatusCardModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { InfoStatusCardConfig } from 'patternfly-ng/card';
 * </pre></code>
 */
var InfoStatusCardComponent = /** @class */ (function () {
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
     * Setup component configuration upon initialization
     */
    InfoStatusCardComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if any component config props have changed
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
    InfoStatusCardComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-info-status-card',
                    template: "<div class=\"card-pf pfng-card-info-status\" [class.card-pf-accented]=\"config.showTopBorder\"><div class=\"pfng-card-info-image\"><img *ngIf=\"config.iconImageSrc\" src=\"{{config.iconImageSrc}}\" alt=\"\" class=\"info-img\"> <span class=\"info-icon {{config.iconStyleClass}}\"></span></div><div class=\"pfng-card-info-content\"><h2 *ngIf=\"config.title\" class=\"pfng-card-title\"><a *ngIf=\"config.href\" href=\"{{config.href}}\"><span>{{config.title}}</span> </a><span *ngIf=\"!config.href\"><span>{{config.title}}</span></span></h2><ng-container *ngIf=\"config.htmlContent !== undefined\"><div *ngIf=\"config.htmlContent; then showHtmlContent else showPlainTextContent\"></div><ng-template #showHtmlContent><div [innerHTML]=\"item\" class=\"pfng-card-info-item\" *ngFor=\"let item of config.info\"></div></ng-template><ng-template #showPlainTextContent><div class=\"pfng-card-info-item\" *ngFor=\"let item of config.info\">{{item}}</div></ng-template></ng-container></div></div>"
                },] },
    ];
    /** @nocollapse */
    InfoStatusCardComponent.ctorParameters = function () { return []; };
    InfoStatusCardComponent.propDecorators = {
        'config': [{ type: Input, args: ['config',] },],
    };
    return InfoStatusCardComponent;
}());
export { InfoStatusCardComponent };
//# sourceMappingURL=info-status-card.component.js.map