import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';

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
@Directive({
  selector: '[pfng-remaining-chars]'
})
export class RemainingCharsDirective implements OnInit {
  @Input() blockInputAtMaxLimit: boolean;
  @Input() charsMaxLimit: number = 100;
  @Input() charsRemainingElement: any;
  @Input() charsRemainingWarning: number = 5;

  @Output('onOverCharsMaxLimit') onOverCharsMaxLimit = new EventEmitter();
  @Output('onUnderCharsMaxLimit') onUnderCharsMaxLimit = new EventEmitter();

  remainingChars: number = 0;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  // Initialization

  ngOnInit(): void {
    this.remainingChars = this.charsMaxLimit;
    this.checkRemainingChars();
  }

  // Actions

  /**
   * Handle key events
   *
   * Note: Using the keyup event Vs keypress to include backspace/delete
   *
   * @param $event
   */
  @HostListener('keyup', ['$event']) handleKeypress($event: KeyboardEvent): void {
    // Once the charsMaxLimit has been met or exceeded, prevent all keypresses from working
    if (this.blockInputAtMaxLimit && this.el.nativeElement.value.length >= this.charsMaxLimit) {
      // Except backspace
      if ($event.keyCode !== 8) {
        $event.preventDefault();
      }
    }
    this.checkRemainingChars();
  }

  // Private

  /**
   * Helper to check remaining characters
   */
  private checkRemainingChars(): void {
    this.setRemainingChars();
    this.setRemainingCharsWarning();
    this.emitRemainingCharsEvent();
  }

  /**
   * Emit remaining characters event
   */
  private emitRemainingCharsEvent(): void {
    if (this.remainingChars <= 0) {
      this.onOverCharsMaxLimit.emit(this.remainingChars);
    } else {
      this.onUnderCharsMaxLimit.emit(this.remainingChars);
    }
  }

  /**
   * Set remaining characters
   */
  private setRemainingChars(): void {
    let charsLength = this.el.nativeElement.value.length;

    // Trim if blockInputAtMaxLimit and over limit
    if (this.blockInputAtMaxLimit && charsLength > this.charsMaxLimit) {
      this.el.nativeElement.value = this.el.nativeElement.value.substring(0, this.charsMaxLimit);
      charsLength = this.el.nativeElement.value.length;
    }
    this.remainingChars = this.charsMaxLimit - charsLength;
  }

  /**
   * Set remaining characters warning
   */
  private setRemainingCharsWarning(): void {
    if (this.charsRemainingElement !== undefined) {
      this.charsRemainingElement.innerText = this.remainingChars;

      if (this.remainingChars <= this.charsRemainingWarning) {
        this.renderer.addClass(this.charsRemainingElement, 'chars-warn-remaining-pf');
      } else {
        this.renderer.removeClass(this.charsRemainingElement, 'chars-warn-remaining-pf');
      }
    }
  }
}
