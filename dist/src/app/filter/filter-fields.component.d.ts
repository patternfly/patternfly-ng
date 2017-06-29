import { EventEmitter, OnInit } from '@angular/core';
import { FilterConfig } from './filter-config';
/**
 * Component for the filter query field and filter query dropdown
 */
export declare class FilterFieldsComponent implements OnInit {
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
    private currentField;
    private currentValue;
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
    private setupConfig();
    private fieldInputKeyPress($event);
    private queryInputChange(value);
    private selectField(field);
    private selectQuery(filterQuery);
}
