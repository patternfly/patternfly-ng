import { EventEmitter, OnInit } from '@angular/core';
import { CardFilter } from '../card-filter/card-filter';
/**
 * Card filter component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { CardFilterModule } from 'patternfly-ng/card';
 * // Or
 * import { CardFilterModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [CardFilterModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CardFilter, CardFilterPosition } from 'patternfly-ng/card';
 * </pre></code>
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
    private select;
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
