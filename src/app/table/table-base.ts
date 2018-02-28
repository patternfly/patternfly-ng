import {
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';

import { Action } from '../action/action';
import { FilterEvent } from '../filter/filter-event';
import { PaginationEvent } from '../pagination/pagination-event';
import { SortEvent } from '../sort/sort-event';
import { ToolbarView } from '../toolbar/toolbar-view';
import { TableEvent } from './table-event';

/**
 * Table base
 */
export abstract class TableBase {
  /**
   * The name of the toolbar template containing actions
   */
  @Input() actionTemplate: TemplateRef<any>;

  /**
   * The name of the toolbar template containing views
   */
  @Input() viewTemplate: TemplateRef<any>;

  /**
   * The event emitted when a row has been dragged and dropped
   */
  @Output('onDrop') onDrop = new EventEmitter();

  /**
   * The Event is emitted when Page Size is changed -- requires paginationConfig
   *
   * Not applicable with ngx-datatable page event
   */
  @Output('onPageSizeChange') onPageSizeChange = new EventEmitter();

  /**
   * The Event is emitted when Page Number is Changed -- requires paginationConfig
   *
   * Not applicable with ngx-datatable page event
   */
  @Output('onPageNumberChange') onPageNumberChange = new EventEmitter();

  /**
   * The event emitted when an action (e.g., button, kebab, etc.) has been selected -- requires toolbarConfig
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  /**
   * The event emitted when a field menu option is selected -- requires toolbarConfig
   */
  @Output('onFilterFieldSelect') onFilterFieldSelect = new EventEmitter();

  /**
   * The event emitted when a filter has been changed -- requires toolbarConfig
   */
  @Output('onFilterChange') onFilterChange = new EventEmitter();

  /**
   * The event emitted when a filter has been saved -- requires toolbarConfig
   */
  @Output('onFilterSave') onFilterSave = new EventEmitter();

  /**
   * The event emitted when the user types ahead in the query input field -- requires toolbarConfig
   */
  @Output('onFilterTypeAhead') onFilterTypeAhead = new EventEmitter();

  /**
   * The event emitted when an item selection has been changed -- requires showCheckbox
   *
   * Not applicable with ngx-datatable select event
   */
  @Output('onSelectionChange') onSelectionChange = new EventEmitter();

  /**
   * The event emitted when the sort has changed -- requires toolbarConfig
   *
   * Not applicable with ngx-datatable sort event
   */
  @Output('onSortChange') onSortChange = new EventEmitter();

  /**
   * The event emitted when a view has been selected -- requires toolbarConfig
   */
  @Output('onViewSelect') onViewSelect = new EventEmitter();

  /**
   * The default constructor
   */
  constructor() {
  }

  // Private

  protected handleAction($event: Action) {
    this.onActionSelect.emit($event);
  }

  protected handleFilterChange($event: FilterEvent) {
    this.onFilterChange.emit($event);
  }

  protected handleFilterFieldSelect($event: FilterEvent) {
    this.onFilterFieldSelect.emit($event);
  }

  protected handleFilterTypeAhead($event: FilterEvent) {
    this.onFilterTypeAhead.emit($event);
  }

  protected handleFilterSave($event: FilterEvent) {
    this.onFilterSave.emit($event);
  }

  protected handlePageSize($event: PaginationEvent) {
    this.onPageSizeChange.emit($event);
  }

  protected handlePageNumber($event: PaginationEvent) {
    this.onPageNumberChange.emit($event);
  }

  protected handleSelectionChange($event: TableEvent) {
    this.onSelectionChange.emit($event);
  }

  protected handleSortChange($event: SortEvent) {
    this.onSortChange.emit($event);
  }

  protected handleViewSelect($event: ToolbarView) {
    this.onViewSelect.emit($event);
  }
}
