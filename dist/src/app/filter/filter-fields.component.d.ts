import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { FilterConfig } from './filter-config';
import { FilterField } from './filter-field';
/**
 * Component for the filter query field and filter query dropdown
 */
export declare class FilterFieldsComponent implements DoCheck, OnInit {
    /**
     * The filter config containing component properties
     */
    config: FilterConfig;
    /**
     * The event emitted when a filter has been added
     */
    onAdd: EventEmitter<{}>;
    /**
     * The event emitted when a field menu option is selected
     */
    onFieldSelect: EventEmitter<{}>;
    /**
     * The event emitted when the user types ahead in the query input field
     */
    onTypeAhead: EventEmitter<{}>;
    private _currentField;
    private _currentValue;
    private defaultConfig;
    private prevConfig;
    /**
     * The default constructor
     */
    constructor();
    /**
     *  Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     *  Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Set up default config
     */
    protected setupConfig(): void;
    /**
     * Get the current filter field
     *
     * @returns {FilterField} The current filter field
     */
    readonly currentField: FilterField;
    /**
     * Get the current filter field value
     *
     * @returns {string} The current filter field value
     */
    /**
     * Set the current filter field value
     *
     * @param val The current filter field value
     */
    currentValue: string;
    private fieldInputKeyPress($event);
    private queryInputChange(value);
    private selectField(field);
    private selectQuery(filterQuery);
}
