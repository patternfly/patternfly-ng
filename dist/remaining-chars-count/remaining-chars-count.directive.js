import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
/**
 * Remaining Characters directive for showing a characters remaining count and triggering warning and error
 * behavior when passing specified thresholds. When the <code>charsRemainingWarning</code> threshold is passed,
 * the <code>chars-warn-remaining-pf</code> css class is applied to the <code>charsRemainingElement</code>, which by
 * default, turns the remaining count number <font color='red'>red</font>. By default, characters may be entered into
 * the text field after the <code>charsMaxLimit</code> limit has been reached, the remaining count number will become a
 * negative value. Setting the <code>blockInputAtMaxLimit</code> to <em>true</em>, will block additional input into the
 * text field after the max has been reached; additionally a right-click 'paste' will only paste characters until the
 * maximum character limit is reached.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { RemainingCharsCountModule } from 'patternfly-ng/remainingCharsCount';
 * // Or
 * import { RemainingCharsCountModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [RemainingCharsCountModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var RemainingCharsCountDirective = /** @class */ (function () {
    /**
     * Default constructor
     *
     * @param el The element reference for this component
     * @param renderer The renderer service
     */
    function RemainingCharsCountDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        /**
         * Number representing the maximum number of characters allowed. Default is 100
         */
        this.charsMaxLimit = 100;
        /**
         * Number of remaining characters to warn upon. Default is 5
         */
        this.charsRemainingWarning = 5;
        /**
         * The event emitted when a remaining characters is over max limit
         */
        this.onOverCharsMaxLimit = new EventEmitter();
        /**
         * The event emitted when a remaining characters is under max limit
         */
        this.onUnderCharsMaxLimit = new EventEmitter();
        this.remainingChars = 0;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
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
     * @param $event A KeyboardEvent object
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
    RemainingCharsCountDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[pfng-remaining-chars-count]'
                },] },
    ];
    /** @nocollapse */
    RemainingCharsCountDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    RemainingCharsCountDirective.propDecorators = {
        'blockInputAtMaxLimit': [{ type: Input },],
        'charsMaxLimit': [{ type: Input },],
        'charsRemainingElement': [{ type: Input },],
        'charsRemainingWarning': [{ type: Input },],
        'onOverCharsMaxLimit': [{ type: Output, args: ['onOverCharsMaxLimit',] },],
        'onUnderCharsMaxLimit': [{ type: Output, args: ['onUnderCharsMaxLimit',] },],
        'handleKeypress': [{ type: HostListener, args: ['keyup', ['$event'],] },],
    };
    return RemainingCharsCountDirective;
}());
export { RemainingCharsCountDirective };
//# sourceMappingURL=remaining-chars-count.directive.js.map