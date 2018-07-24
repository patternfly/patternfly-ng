var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { uniqueId } from 'lodash';
import { CopyBase } from '../copy-base';
import { CopyService } from '../copy-service/copy.service';
/**
 * Block Copy component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { BlockCopyModule } from 'patternfly-ng/copy';
 * // Or
 * import { BlockCopyModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [BlockCopyModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CopyEvent } from 'patternfly-ng/copy';
 * </pre></code>
 */
var BlockCopyComponent = /** @class */ (function (_super) {
    __extends(BlockCopyComponent, _super);
    /**
     * The default constructor
     */
    function BlockCopyComponent(copyService) {
        var _this = _super.call(this, copyService) || this;
        _this.copyService = copyService;
        /**
         * Flag indicating the expanded state for the expansion panel
         */
        _this.expanded = false;
        /**
         * Generates a unique prefix for element IDs
         */
        _this.uniqueID = uniqueId('pfng-block-copy');
        return _this;
    }
    Object.defineProperty(BlockCopyComponent.prototype, "buttonId", {
        /**
         * Generates a unique ID for the button
         */
        get: function () {
            return this.uniqueID + "-button";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle expansion panel open and close
     */
    BlockCopyComponent.prototype.togglePanel = function () {
        this.expanded = !this.expanded;
    };
    BlockCopyComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-block-copy',
                    template: "<div class=\"pfng-block-copy\"><label *ngIf=\"label\" class=\"pfng-block-copy-label\" [attr.for]=\"buttonId\">{{label}}</label><div class=\"pfng-block-copy-inner-container\"><div class=\"pfng-block-copy-preview\" [ngClass]=\"{'pf-is-open': expanded}\"><button [attr.aria-label]=\"expandToggleAriaLabel\" [attr.aria-expanded]=\"expanded\" class=\"pfng-block-copy-preview-btn\" (click)=\"togglePanel()\"><i aria-hidden=\"true\" class=\"fa pfng-block-copy-preview-icon\" [ngClass]=\"{'fa-angle-down': expanded, 'fa-angle-right': !expanded}\"></i></button><div class=\"pfng-block-copy-preview-txt-cont\" placement=\"{{tooltipPlacement ? tooltipPlacement : null}}\" tooltip=\"{{tooltip ? tooltip : null}}\"><span class=\"pfng-block-copy-preview-txt\">{{value}}</span></div><button [attr.id]=\"buttonId\" class=\"btn btn-lg btn-default pfng-block-copy-btn\" [attr.aria-label]=\"buttonAriaLabel\" (click)=\"copy()\"><span><ng-container *ngIf=\"!recentlyCopied\">{{buttonLabel}}</ng-container><ng-container *ngIf=\"recentlyCopied\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Copied</ng-container></span></button></div><div class=\"pfng-block-copy-body\" *ngIf=\"expanded\"><span>{{value}}</span></div></div></div>"
                },] },
    ];
    /** @nocollapse */
    BlockCopyComponent.ctorParameters = function () { return [
        { type: CopyService, },
    ]; };
    BlockCopyComponent.propDecorators = {
        'label': [{ type: Input, args: ['label',] },],
        'buttonLabel': [{ type: Input, args: ['buttonLabel',] },],
        'expanded': [{ type: Input, args: ['expanded',] },],
        'expandToggleAriaLabel': [{ type: Input, args: ['expandToggleAriaLabel',] },],
    };
    return BlockCopyComponent;
}(CopyBase));
export { BlockCopyComponent };
//# sourceMappingURL=block-copy.component.js.map