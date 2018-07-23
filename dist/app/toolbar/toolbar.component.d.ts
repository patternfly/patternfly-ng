import { DoCheck, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { Filter } from '../filter/filter';
import { ToolbarConfig } from './toolbar-config';
/**
 * Toolbar component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ToolbarModule } from 'patternfly-ng/toolbar';
 * // Or
 * import { ToolbarModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [BsDropdownModule.forRoot(), ToolbarModule,...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { ToolbarConfig, ToolbarView } from 'patternfly-ng/toolbar';
 * </pre></code>
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
     * The event emitted when a filter has been saved
     */
    onFilterSave: EventEmitter<{}>;
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
    private filterFields;
    private defaultConfig;
    private prevConfig;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Check if the component config has changed
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
    /**
     * Reset current field and value
     */
    resetFilterField(): void;
    private filterAdded;
    private filterExists;
    private handleAction;
    private handleFilterFieldSelect;
    private handleFilterSave;
    private handleFilterTypeAhead;
    private sortChange;
    private isViewSelected;
    private viewSelected;
    private enforceSingleSelect;
}
