import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ToolbarConfig } from './toolbar-config';
/**
 * Toolbar component
 */
export declare class ToolbarComponent implements OnInit {
    /**
     * The toolbar config containing component properties
     */
    config: ToolbarConfig;
    /**
     * The name of the template containing actions
     */
    actionsTemplate: TemplateRef<any>;
    /**
     * The name of the template containing views
     */
    viewsTemplate: TemplateRef<any>;
    /**
     * The event emitted when an action (e.g., button, kebab, etc.) has been selected
     */
    onActionSelect: EventEmitter<{}>;
    /**
     * The event emitted when a field menu option is selected
     */
    onFilterFiledSelect: EventEmitter<{}>;
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
    private setupConfig();
    private handleAction(action);
    private clearFilter($event);
    private filterAdded($event);
    private filterExists(filter);
    private handleFilterFieldSelect($event);
    private handleFilterTypeAhead($event);
    private sortChange($event);
    private isViewSelected(view);
    private submit($event);
    private viewSelected(view);
    private enforceSingleSelect(filter);
}
