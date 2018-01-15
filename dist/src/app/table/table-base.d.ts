import { EventEmitter, TemplateRef } from '@angular/core';
import { Action } from '../action/action';
import { FilterEvent } from '../filter/filter-event';
import { PaginationEvent } from '../pagination/pagination-event';
import { SortEvent } from '../sort/sort-event';
import { ToolbarView } from '../toolbar/toolbar-view';
import { TableEvent } from './table-event';
/**
 * Table base
 */
export declare abstract class TableBase {
    /**
     * The name of the toolbar template containing actions
     */
    actionTemplate: TemplateRef<any>;
    /**
     * The name of the toolbar template containing views
     */
    viewTemplate: TemplateRef<any>;
    /**
     * The event emitted when a row has been dragged and dropped
     */
    onDrop: EventEmitter<{}>;
    /**
     * The Event is emitted when Page Size is changed
     */
    onPageSizeChange: EventEmitter<{}>;
    /**
     * The Event is emitted when Page Number is Changed
     */
    onPageNumberChange: EventEmitter<{}>;
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
     * The event emitted when an item selection has been changed
     */
    onSelectionChange: EventEmitter<{}>;
    /**
     * The event emitted when the sort has changed
     */
    onSortChange: EventEmitter<{}>;
    /**
     * The event emitted when a view has been selected
     */
    onViewSelect: EventEmitter<{}>;
    /**
     * The default constructor
     */
    constructor();
    protected handleAction($event: Action): void;
    protected handleFilterChange($event: FilterEvent): void;
    protected handleFilterFieldSelect($event: FilterEvent): void;
    protected handleFilterTypeAhead($event: FilterEvent): void;
    protected handleFilterSave($event: FilterEvent): void;
    protected handlePageSize($event: PaginationEvent): void;
    protected handlePageNumber($event: PaginationEvent): void;
    protected handleSelectionChange($event: TableEvent): void;
    protected handleSortChange($event: SortEvent): void;
    protected handleViewSelect($event: ToolbarView): void;
}
