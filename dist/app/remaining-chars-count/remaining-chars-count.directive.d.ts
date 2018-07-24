import { ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
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
export declare class RemainingCharsCountDirective implements OnInit {
    private el;
    private renderer;
    /**
     * If true, no more characters can be entered into the text field
     */
    blockInputAtMaxLimit: boolean;
    /**
     * Number representing the maximum number of characters allowed. Default is 100
     */
    charsMaxLimit: number;
    /**
     * The ElementRef used to display the characters remaining count
     */
    charsRemainingElement: any;
    /**
     * Number of remaining characters to warn upon. Default is 5
     */
    charsRemainingWarning: number;
    /**
     * The event emitted when a remaining characters is over max limit
     */
    onOverCharsMaxLimit: EventEmitter<{}>;
    /**
     * The event emitted when a remaining characters is under max limit
     */
    onUnderCharsMaxLimit: EventEmitter<{}>;
    private remainingChars;
    /**
     * Default constructor
     *
     * @param el The element reference for this component
     * @param renderer The renderer service
     */
    constructor(el: ElementRef, renderer: Renderer2);
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Handle key events
     *
     * Note: Using the keyup event Vs keypress to include backspace/delete
     *
     * @param $event A KeyboardEvent object
     */
    private handleKeypress;
    /**
     * Helper to check remaining characters
     */
    private checkRemainingChars;
    /**
     * Emit remaining characters event
     */
    private emitRemainingCharsEvent;
    /**
     * Set remaining characters
     */
    private setRemainingChars;
    /**
     * Set remaining characters warning
     */
    private setRemainingCharsWarning;
}
