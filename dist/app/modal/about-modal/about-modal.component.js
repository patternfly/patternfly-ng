import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
/**
 * About Modal component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { AboutModalModule } from 'patternfly-ng/modal';
 * // Or
 * import { AboutModalModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { ModalModule } from 'ngx-bootstrap/modal';
 *
 * &#64;NgModule({
 *   imports: [AboutModalModule, ModalModule.forRoot(),...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { AboutModalConfig, AboutModalEvent } from 'patternfly-ng/modal';
 * </pre></code>
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
    AboutModalComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-about-modal',
                    template: "<div class=\"about-modal-pf\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" (click)=\"close()\" aria-hidden=\"true\"><span class=\"pficon pficon-close\"></span></button></div><div class=\"modal-body\"><h1 *ngIf=\"config.title\">{{config.title}}</h1><div *ngIf=\"config.productInfo && config.productInfo.length > 0\" class=\"product-versions-pf\"><ul class=\"list-unstyled\"><li *ngFor=\"let info of config.productInfo\"><strong>{{info.name}}</strong> {{info.value}}</li></ul></div><div class=\"product-versions-pf\"><ng-content></ng-content></div><div *ngIf=\"config.additionalInfo\" class=\"product-versions-pf\">{{config.additionalInfo}}</div><div *ngIf=\"config.copyright\" class=\"trademark-pf\">{{config.copyright}}</div></div><div class=\"modal-footer\"><img *ngIf=\"config.logoImageSrc\" [src]=\"config.logoImageSrc\" alt=\"{{config.logoImageAlt}}\"></div></div>"
                },] },
    ];
    /** @nocollapse */
    AboutModalComponent.ctorParameters = function () { return []; };
    AboutModalComponent.propDecorators = {
        'config': [{ type: Input },],
        'onCancel': [{ type: Output, args: ['onCancel',] },],
    };
    return AboutModalComponent;
}());
export { AboutModalComponent };
//# sourceMappingURL=about-modal.component.js.map