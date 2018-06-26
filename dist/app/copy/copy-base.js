var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventEmitter, Input, Output, } from '@angular/core';
/**
 * A config containing properties for copy components
 */
var CopyBase = /** @class */ (function () {
    /**
     * Default constructor
     */
    function CopyBase(copyService) {
        this.copyService = copyService;
        /**
         * Placement for the tooltip that further describes the copyValue
         */
        this.tooltipPlacement = 'top';
        /**
         * Event emitted with the chart reference after load is complete
         */
        this.onCopyToClipboard = new EventEmitter();
        this._recentlyCopied = false;
    }
    Object.defineProperty(CopyBase.prototype, "recentlyCopied", {
        /**
         * Returns the flag indicating copy action has just happened
         *
         * @returns {boolean} True if copy action has been triggered
         */
        get: function () {
            return this._recentlyCopied;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copy value to the user's system clipboard
     */
    CopyBase.prototype.copyValueToClipboard = function () {
        var _this = this;
        var result = this.copyService.copy(this.copyValue);
        if (result) {
            this.onCopyToClipboard.emit({
                value: this.copyValue
            });
            this._recentlyCopied = true;
            setTimeout(function () {
                _this._recentlyCopied = false;
            }, 3000);
        }
    };
    __decorate([
        Input('copyBtnAriaLabel'),
        __metadata("design:type", String)
    ], CopyBase.prototype, "copyBtnAriaLabel", void 0);
    __decorate([
        Input('copyValue'),
        __metadata("design:type", String)
    ], CopyBase.prototype, "copyValue", void 0);
    __decorate([
        Input('tooltip'),
        __metadata("design:type", String)
    ], CopyBase.prototype, "tooltip", void 0);
    __decorate([
        Input('tooltipPlacement'),
        __metadata("design:type", String)
    ], CopyBase.prototype, "tooltipPlacement", void 0);
    __decorate([
        Output('onCopyToClipboard'),
        __metadata("design:type", EventEmitter)
    ], CopyBase.prototype, "onCopyToClipboard", void 0);
    return CopyBase;
}());
export { CopyBase };
//# sourceMappingURL=copy-base.js.map