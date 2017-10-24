import { EventEmitter, OnInit } from '@angular/core';
import { CardFilter } from '../card-filter/card-filter';
/**
 * Card filter component
 */
export declare class CardFilterComponent implements OnInit {
    private _currentFilter;
    /**
     * The card filters
     */
    filters: CardFilter[];
    /**
     * The event emitted when a filter is selected
     */
    onSelect: EventEmitter<{}>;
    /**
     * The default constructor
     */
    constructor();
    /**
     *  Setup component configuration upon initialization
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
