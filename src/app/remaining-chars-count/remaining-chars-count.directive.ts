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
 * Remaining Characters directive for showing a characters remaining count and triggering warning and error
 * behavior when passing specified thresholds. When the <code>charsRemainingWarning</code> threshold is passed,
 * the <code>chars-warn-remaining-pf</code> css class is applied to the <code>charsRemainingElement</code>, which by
 * default, turns the remaining count number <font color='red'>red</font>. By default, characters may be entered into
 * the text field after the <code>charsMaxLimit</code> limit has been reached, the remaining count number will become a
 * negative value. Setting the <code>blockInputAtMaxLimit</code> to <em>true</em>, will block additional input into the
 * text field after the max has been reached; additionally a right-click 'paste' will only paste characters until the
 * maximum character limit is reached.
 */
@Directive({
  selector: '[pfng-remaining-chars-count]'
})
export class RemainingCharsCountDirective implements OnInit {
  /**
   * If true, no more characters can be entered into the text field
   */
  @Input() blockInputAtMaxLimit: boolean;

  /**
   * Number representing the maximum number of characters allowed. Default is 100
   */
  @Input() charsMaxLimit: number = 100;

  /**
   * The ElementRef used to display the characters remaining count
   */
  @Input() charsRemainingElement: any;

  /**
   * Number of remaining characters to warn upon. Default is 5
   */
  @Input() charsRemainingWarning: number = 5;

  /**
   * The event emitted when a remaining characters is over max limit
   */
  @Output('onOverCharsMaxLimit') onOverCharsMaxLimit = new EventEmitter();

  /**
   * The event emitted when a remaining characters is under max limit
   */
  @Output('onUnderCharsMaxLimit') onUnderCharsMaxLimit = new EventEmitter();

  private remainingChars: number = 0;

  /**
   * Default constructor
   *
   * @param el The element reference for this component
   * @param renderer The renderer service
   */
  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
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
   * @param $event A KeyboardEvent object
   */
  @HostListener('keyup', ['$event']) private handleKeypress($event: KeyboardEvent): void {
    // Once the charsMaxLimit has been met or exceeded, prevent all keypresses from working
    if (this.blockInputAtMaxLimit && this.el.nativeElement.value.length >= this.charsMaxLimit) {
      // Except backspace
      if ($event.keyCode !== 8) {
        $event.preventDefault();
      }
    }
    this.checkRemainingChars();
  }

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
