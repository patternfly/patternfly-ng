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
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { uniqueId } from 'lodash';
import { CopyBase } from '../copy-base';
import { CopyService } from '../copy-service/copy.service';
/**
 * Block Copy component
 *
 * Usage:
 * <br/><code>import { BlockCopyModule } from 'patternfly-ng/copy';</code>
 *
 * Or:
 * <br/><code>import { BlockCopyModule } from 'patternfly-ng';</code>
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
         * Copy button text
         */
        _this.copyBtnLabel = 'Copy';
        /**
         * Controls the expanded state of block copy
         */
        _this.expanded = false;
        /**
         * Generates a unique value for an id
         */
        _this.uniqueID = uniqueId('pfng-block-copy');
        return _this;
    }
    Object.defineProperty(BlockCopyComponent.prototype, "copyBtnId", {
        /**
         * Used to uniquly relate label to copy button
         */
        get: function () {
            return this.uniqueID + "-button";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle copyValue panel open and close
     */
    BlockCopyComponent.prototype.togglePanel = function () {
        this.expanded = !this.expanded;
    };
    /**
     * Copies the label value to the users clipboard
     */
    BlockCopyComponent.prototype.copyToClipboard = function () {
        this.copyValueToClipboard();
    };
    __decorate([
        Input('label'),
        __metadata("design:type", String)
    ], BlockCopyComponent.prototype, "label", void 0);
    __decorate([
        Input('copyBtnLabel'),
        __metadata("design:type", String)
    ], BlockCopyComponent.prototype, "copyBtnLabel", void 0);
    __decorate([
        Input('expanded'),
        __metadata("design:type", Boolean)
    ], BlockCopyComponent.prototype, "expanded", void 0);
    __decorate([
        Input('expandBtnAriaLabel'),
        __metadata("design:type", String)
    ], BlockCopyComponent.prototype, "expandBtnAriaLabel", void 0);
    BlockCopyComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-block-copy',
            template: "<div class=\"pfng-block-copy\"><label *ngIf=\"label\" class=\"pfng-block-copy-label\" [attr.for]=\"copyBtnId\">{{label}}</label><div class=\"pfng-block-copy-inner-container\"><div class=\"pfng-block-copy-preview\" [ngClass]=\"{'pf-is-open': expanded}\"><button [attr.aria-label]=\"expandBtnAriaLabel\" [attr.aria-expanded]=\"expanded\" class=\"pfng-block-copy-preview-btn\" (click)=\"togglePanel()\"><i aria-hidden=\"true\" class=\"fa pfng-block-copy-preview-icon\" [ngClass]=\"{'fa-angle-down': expanded, 'fa-angle-right': !expanded}\"></i></button><div class=\"pfng-block-copy-preview-txt-cont\" placement=\"{{tooltipPlacement ? tooltipPlacement : null}}\" tooltip=\"{{tooltip ? tooltip : null}}\"><span class=\"pfng-block-copy-preview-txt\">{{copyValue}}</span></div><button [attr.id]=\"copyBtnId\" class=\"btn btn-lg btn-default pfng-block-copy-btn\" [attr.aria-label]=\"copyBtnAriaLabel\" (click)=\"copyToClipboard()\"><span><ng-container *ngIf=\"!recentlyCopied\">{{copyBtnLabel}}</ng-container><ng-container *ngIf=\"recentlyCopied\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Copied</ng-container></span></button></div><div class=\"pfng-block-copy-body\" *ngIf=\"expanded\"><span>{{copyValue}}</span></div></div></div>",
            styleUrls: ['./block-copy.component.less']
        }),
        __metadata("design:paramtypes", [CopyService])
    ], BlockCopyComponent);
    return BlockCopyComponent;
}(CopyBase));
export { BlockCopyComponent };
//# sourceMappingURL=block-copy.component.js.map