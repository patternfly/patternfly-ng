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
   * The Event is emitted when Page Size is changed
   */
  @Output('onPageSizeChange') onPageSizeChange = new EventEmitter();

  /**
   * The Event is emitted when Page Number is Changed
   */
  @Output('onPageNumberChange') onPageNumberChange = new EventEmitter();

  /**
   * The event emitted when an action (e.g., button, kebab, etc.) has been selected
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  /**
   * The event emitted when a field menu option is selected
   */
  @Output('onFilterFieldSelect') onFilterFieldSelect = new EventEmitter();

  /**
   * The event emitted when a filter has been changed
   */
  @Output('onFilterChange') onFilterChange = new EventEmitter();

  /**
   * The event emitted when a filter has been saved
   */
  @Output('onFilterSave') onFilterSave = new EventEmitter();

  /**
   * The event emitted when the user types ahead in the query input field
   */
  @Output('onFilterTypeAhead') onFilterTypeAhead = new EventEmitter();

  /**
   * The event emitted when an item selection has been changed
   */
  @Output('onSelectionChange') onSelectionChange = new EventEmitter();

  /**
   * The event emitted when the sort has changed
   */
  @Output('onSortChange') onSortChange = new EventEmitter();

  /**
   * The event emitted when a view has been selected
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
