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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { CopyBase } from '../copy-base';
import { CopyService } from '../copy-service/copy.service';
/**
 * Inline Copy component
 *
 * Usage:
 * <br/><code>import { InlineCopyModule } from 'patternfly-ng/copy';</code>
 *
 * Or:
 * <br/><code>import { InlineCopyModule } from 'patternfly-ng';</code>
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
    InlineCopyComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-inline-copy',
            template: "<span class=\"pfng-inline-copy\"><span class=\"pfng-inline-copy-txt-cont\" placement=\"{{tooltipPlacement ? tooltipPlacement : null}}\" tooltip=\"{{tooltip ? tooltip : null}}\">{{value}} </span><button class=\"pfng-inline-copy-btn\" [attr.aria-label]=\"buttonAriaLabel\" (click)=\"copy()\"><i class=\"fa\" [ngClass]=\"{'fa-check': recentlyCopied, 'fa-clipboard': !recentlyCopied}\" aria-hidden=\"true\"></i></button></span>"
        }),
        __metadata("design:paramtypes", [CopyService])
    ], InlineCopyComponent);
    return InlineCopyComponent;
}(CopyBase));
export { InlineCopyComponent };
//# sourceMappingURL=inline-copy.component.js.map