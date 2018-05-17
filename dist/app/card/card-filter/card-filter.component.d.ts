import { EventEmitter, OnInit } from '@angular/core';
import { CardFilter } from '../card-filter/card-filter';
/**
 * Card filter component
 *
 * Usage:
 * <br/><code>import { CardFilterModule } from 'patternfly-ng/card';</code>
 *
 * Or:
 * <br/><code>import { CardFilterModule } from 'patternfly-ng';</code>
 */
export declare class CardFilterComponent implements OnInit {
    /**
     * The card filters
     */
    filters: CardFilter[];
    /**
     * The event emitted when a filter is selected
     */
    onSelect: EventEmitter<{}>;
    private _currentFilter;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    private select($event);
    /**
     * Returns the current filter
     *
     * @returns {CardFilter} The current filter
     */
    /**
     * Sets the current filter
     *
     * @param {CardFilter} filter The current filter
     */
    currentFilter: CardFilter;
}
