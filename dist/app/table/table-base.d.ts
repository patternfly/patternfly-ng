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
     * The Event is emitted when Page Size is changed -- requires paginationConfig
     *
     * Not applicable with ngx-datatable page event
     */
    onPageSizeChange: EventEmitter<{}>;
    /**
     * The Event is emitted when Page Number is Changed -- requires paginationConfig
     *
     * Not applicable with ngx-datatable page event
     */
    onPageNumberChange: EventEmitter<{}>;
    /**
     * The event emitted when an action (e.g., button, kebab, etc.) has been selected -- requires toolbarConfig
     */
    onActionSelect: EventEmitter<{}>;
    /**
     * The event emitted when a field menu option is selected -- requires toolbarConfig
     */
    onFilterFieldSelect: EventEmitter<{}>;
    /**
     * The event emitted when a filter has been changed -- requires toolbarConfig
     */
    onFilterChange: EventEmitter<{}>;
    /**
     * The event emitted when a filter has been saved -- requires toolbarConfig
     */
    onFilterSave: EventEmitter<{}>;
    /**
     * The event emitted when the user types ahead in the query input field -- requires toolbarConfig
     */
    onFilterTypeAhead: EventEmitter<{}>;
    /**
     * The event emitted when an item selection has been changed -- requires showCheckbox
     *
     * Not applicable with ngx-datatable select event
     */
    onSelectionChange: EventEmitter<{}>;
    /**
     * The event emitted when the sort has changed -- requires toolbarConfig
     *
     * Not applicable with ngx-datatable sort event
     */
    onSortChange: EventEmitter<{}>;
    /**
     * The event emitted when a view has been selected -- requires toolbarConfig
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
