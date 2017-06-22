import { ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
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
export declare class RemainingCharsDirective implements OnInit {
    private el;
    private renderer;
    blockInputAtMaxLimit: boolean;
    charsMaxLimit: number;
    charsRemainingElement: any;
    charsRemainingWarning: number;
    onOverCharsMaxLimit: EventEmitter<{}>;
    onUnderCharsMaxLimit: EventEmitter<{}>;
    remainingChars: number;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    /**
     * Handle key events
     *
     * Note: Using the keyup event Vs keypress to include backspace/delete
     *
     * @param $event
     */
    handleKeypress($event: KeyboardEvent): void;
    /**
     * Helper to check remaining characters
     */
    private checkRemainingChars();
    /**
     * Emit remaining characters event
     */
    private emitRemainingCharsEvent();
    /**
     * Set remaining characters
     */
    private setRemainingChars();
    /**
     * Set remaining characters warning
     */
    private setRemainingCharsWarning();
}
