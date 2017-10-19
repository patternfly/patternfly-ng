import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { CardAction } from './card-action';

/**
 * Card action component
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-card-action',
  templateUrl: './card-action.component.html'
})
export class CardActionComponent implements OnInit {
  /**
   * The card filters
   */
  @Input() action: CardAction;

  /**
   * The event emitted when a filter is selected
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  /**
   * The default constructor
   */
  constructor() {}

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {}

  // Actions

  private select($event: MouseEvent): void {
    this.onActionSelect.emit(this.action);
  }
}
