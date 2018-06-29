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
import { Component, ViewEncapsulation } from '@angular/core';
import { CopyBase } from '../copy-base';
import { CopyService } from '../copy-service/copy.service';
/**
 * Inline Copy component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { InlineCopyModule } from 'patternfly-ng/copy';
 * // Or
 * import { InlineCopyModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [InlineCopyModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CopyEvent } from 'patternfly-ng/copy';
 * </pre></code>
 */
var InlineCopyComponent = /** @class */ (function (_super) {
    __extends(InlineCopyComponent, _super);
    /**
     * The default constructor
     */
    function InlineCopyComponent(copyService) {
        var _this = _super.call(this, copyService) || this;
        _this.copyService = copyService;
        return _this;
    }
    InlineCopyComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-inline-copy',
                    template: "<span class=\"pfng-inline-copy\"><span class=\"pfng-inline-copy-txt-cont\" placement=\"{{tooltipPlacement ? tooltipPlacement : null}}\" tooltip=\"{{tooltip ? tooltip : null}}\">{{value}} </span><button class=\"pfng-inline-copy-btn\" [attr.aria-label]=\"buttonAriaLabel\" (click)=\"copy()\"><i class=\"fa\" [ngClass]=\"{'fa-check': recentlyCopied, 'fa-clipboard': !recentlyCopied}\" aria-hidden=\"true\"></i></button></span>"
                },] },
    ];
    /** @nocollapse */
    InlineCopyComponent.ctorParameters = function () { return [
        { type: CopyService, },
    ]; };
    return InlineCopyComponent;
}(CopyBase));
export { InlineCopyComponent };
//# sourceMappingURL=inline-copy.component.js.map