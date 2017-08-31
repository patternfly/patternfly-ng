import { DoCheck, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { Filter } from '../filter/filter';
import { ToolbarConfig } from './toolbar-config';
/**
 * Toolbar component
 */
export declare class ToolbarComponent implements DoCheck, OnInit {
    /**
     * The toolbar config containing component properties
     */
    config: ToolbarConfig;
    /**
     * The name of the template containing actions
     */
    actionTemplate: TemplateRef<any>;
    /**
     * The name of the template containing views
     */
    viewTemplate: TemplateRef<any>;
    /**
     * The event emitted when an action (e.g., button, kebab, etc.) has been selected
     */
    onActionSelect: EventEmitter<{}>;
    /**
     * The event emitted when a field menu option is selected
     */
    onFilterFieldSelect: EventEmitter<{}>;
    /**
     * The event emitted when a filter has been changed
     */
    onFilterChange: EventEmitter<{}>;
    /**
     * The event emitted when the user types ahead in the query input field
     */
    onFilterTypeAhead: EventEmitter<{}>;
    /**
     * The event emitted when the sort has changed
     */
    onSortChange: EventEmitter<{}>;
    /**
     * The event emitted when a view has been selected
     */
    onViewSelect: EventEmitter<{}>;
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
     * Handle clear filter event
     *
     * @param $event An array of current Filter objects
     */
    clearFilter($event: Filter[]): void;
    private filterAdded($event);
    private filterExists(filter);
    private handleAction(action);
    private handleFilterFieldSelect($event);
    private handleFilterTypeAhead($event);
    private sortChange($event);
    private isViewSelected(currentView);
    private viewSelected(currentView);
    private enforceSingleSelect(filter);
}
