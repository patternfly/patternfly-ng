"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Remaining Characters component for showing a characters remaining count and triggering warning and error
 * behavior when passing specified thresholds.  When the <code>charsRemainingWarning</code> threshold is passed,
 * the <code>chars-warn-remaining-pf</code> css class is applied to the <code>charsRemainingElement</code>, which by
 * default, turns the remaining count number <font color='red'>red</font>. By default, characters may be entered into
 * the text field after the <code>charsMaxLimit</code> limit has been reached, the remaining count number will become a
 * negative value. Setting the <code>blockInputAtMaxLimit</code> to <em>true</em>, will block additional input into the
 * text field after the max has been reached; additionally a right-click 'paste' will only paste characters until the
 * maximum character limit is reached.
 *
 * blockInputAtMaxLimit - If true, no more characters can be entered into the text field
 * charsMaxLimit - Number representing the maximum number of characters allowed
 * charsRemainingElement - The ElementRef used to display the 'characters-remaining' count
 * charsRemainingWarning - Number of remaining characters to warn upon
 */
var RemainingCharsCountDirective = (function () {
    function RemainingCharsCountDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.charsMaxLimit = 100;
        this.charsRemainingWarning = 5;
        this.onOverCharsMaxLimit = new core_1.EventEmitter();
        this.onUnderCharsMaxLimit = new core_1.EventEmitter();
        this.remainingChars = 0;
    }
    // Initialization
    RemainingCharsCountDirective.prototype.ngOnInit = function () {
        this.remainingChars = this.charsMaxLimit;
        this.checkRemainingChars();
    };
    // Actions
    /**
     * Handle key events
     *
     * Note: Using the keyup event Vs keypress to include backspace/delete
     *
     * @param $event
     */
    RemainingCharsCountDirective.prototype.handleKeypress = function ($event) {
        // Once the charsMaxLimit has been met or exceeded, prevent all keypresses from working
        if (this.blockInputAtMaxLimit && this.el.nativeElement.value.length >= this.charsMaxLimit) {
            // Except backspace
            if ($event.keyCode !== 8) {
                $event.preventDefault();
            }
        }
        this.checkRemainingChars();
    };
    // Private
    /**
     * Helper to check remaining characters
     */
    RemainingCharsCountDirective.prototype.checkRemainingChars = function () {
        this.setRemainingChars();
        this.setRemainingCharsWarning();
        this.emitRemainingCharsEvent();
    };
    /**
     * Emit remaining characters event
     */
    RemainingCharsCountDirective.prototype.emitRemainingCharsEvent = function () {
        if (this.remainingChars <= 0) {
            this.onOverCharsMaxLimit.emit(this.remainingChars);
        }
        else {
            this.onUnderCharsMaxLimit.emit(this.remainingChars);
        }
    };
    /**
     * Set remaining characters
     */
    RemainingCharsCountDirective.prototype.setRemainingChars = function () {
        var charsLength = this.el.nativeElement.value.length;
        // Trim if blockInputAtMaxLimit and over limit
        if (this.blockInputAtMaxLimit && charsLength > this.charsMaxLimit) {
            this.el.nativeElement.value = this.el.nativeElement.value.substring(0, this.charsMaxLimit);
            charsLength = this.el.nativeElement.value.length;
        }
        this.remainingChars = this.charsMaxLimit - charsLength;
    };
    /**
     * Set remaining characters warning
     */
    RemainingCharsCountDirective.prototype.setRemainingCharsWarning = function () {
        if (this.charsRemainingElement !== undefined) {
            this.charsRemainingElement.innerText = this.remainingChars;
            if (this.remainingChars <= this.charsRemainingWarning) {
                this.renderer.addClass(this.charsRemainingElement, 'chars-warn-remaining-pf');
            }
            else {
                this.renderer.removeClass(this.charsRemainingElement, 'chars-warn-remaining-pf');
            }
        }
    };
    return RemainingCharsCountDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RemainingCharsCountDirective.prototype, "blockInputAtMaxLimit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RemainingCharsCountDirective.prototype, "charsMaxLimit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RemainingCharsCountDirective.prototype, "charsRemainingElement", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RemainingCharsCountDirective.prototype, "charsRemainingWarning", void 0);
__decorate([
    core_1.Output('onOverCharsMaxLimit'),
    __metadata("design:type", Object)
], RemainingCharsCountDirective.prototype, "onOverCharsMaxLimit", void 0);
__decorate([
    core_1.Output('onUnderCharsMaxLimit'),
    __metadata("design:type", Object)
], RemainingCharsCountDirective.prototype, "onUnderCharsMaxLimit", void 0);
__decorate([
    core_1.HostListener('keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], RemainingCharsCountDirective.prototype, "handleKeypress", null);
RemainingCharsCountDirective = __decorate([
    core_1.Directive({
        selector: '[pfng-remaining-chars-count]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer2])
], RemainingCharsCountDirective);
exports.RemainingCharsCountDirective = RemainingCharsCountDirective;
//# sourceMappingURL=remaining-chars-count.directive.js.map