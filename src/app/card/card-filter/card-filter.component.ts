import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { CardFilter } from '../card-filter/card-filter';

/**
 * Card filter component
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-card-filter',
  templateUrl: './card-filter.component.html'
})
export class CardFilterComponent implements OnInit {
  /**
   * The card filters
   */
  @Input() filters: CardFilter[];

  /**
   * The event emitted when a filter is selected
   */
  @Output('onFilterSelect') onSelect = new EventEmitter();

  private _currentFilter: CardFilter;

  /**
   * The default constructor
   */
  constructor() {
  }

  // Initialization

  /**
   * Setup component configuration upon initialization
   */
  ngOnInit(): void {
    if (this.filters !== undefined && this.filters.length > 0) {
      this.currentFilter = this.filters[0];
      this.filters.forEach((filter) => {
        if (filter.default === true) {
          this.currentFilter = filter;
          return;
        }
      });
    }
  }

  // Actions

  private select($event: CardFilter): void {
    this.currentFilter = $event;
    this.onSelect.emit($event);
  }

  // Accessors

  /**
   * Returns the current filter
   *
   * @returns {CardFilter} The current filter
   */
  get currentFilter(): CardFilter {
    return this._currentFilter;
  }

  /**
   * Sets the current filter
   *
   * @param {CardFilter} filter The current filter
   */
  set currentFilter(filter: CardFilter) {
    this._currentFilter = filter;
  }
}
