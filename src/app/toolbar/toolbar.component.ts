import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../models/action';
import { Filter } from '../filter/filter';
import { FilterEvent } from '../filter/filter-event';
import { SortEvent } from '../sort/sort-event';
import { ToolbarConfig } from './toolbar-config';
import { View } from '../models/view';

import { cloneDeep, defaults, find, isEqual, remove } from 'lodash';

/**
 * Toolbar component
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-toolbar',
  styleUrls: ['./toolbar.component.less'],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
  /**
   * The toolbar config containing component properties
   */
  @Input() config: ToolbarConfig;

  /**
   * The name of the template containing actions
   */
  @Input() actionsTemplate: TemplateRef<any>;

  /**
   * The name of the template containing views
   */
  @Input() viewsTemplate: TemplateRef<any>;

  /**
   * The event emitted when an action (e.g., button, kebab, etc.) has been selected
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  /**
   * The event emitted when a field menu option is selected
   */
  @Output('onFilterFieldSelect') onFilterFiledSelect = new EventEmitter();

  /**
   * The event emitted when a filter has been changed
   */
  @Output('onFilterChange') onFilterChange = new EventEmitter();

  /**
   * The event emitted when the user types ahead in the query input field
   */
  @Output('onFilterTypeAhead') onFilterTypeAhead = new EventEmitter();

  /**
   * The event emitted when the sort has changed
   */
  @Output('onSortChange') onSortChange = new EventEmitter();

  /**
   * The event emitted when a view has been selected
   */
  @Output('onViewSelect') onViewSelect = new EventEmitter();

  private defaultConfig: ToolbarConfig = {} as ToolbarConfig;
  private prevConfig: ToolbarConfig;

  /**
   * The default constructor
   */
  constructor() {
  }

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
  }

  /**
   *  Check if the component config has changed
   */
  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  private setupConfig(): void {
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }

    if (this.config && this.config.filterConfig
        && this.config.filterConfig.appliedFilters === undefined) {
      this.config.filterConfig.appliedFilters = [];
    }
    if (this.config && this.config.sortConfig && this.config.sortConfig.fields === undefined) {
      this.config.sortConfig.fields = [];
    }
    if (this.config.sortConfig !== undefined && this.config.sortConfig.visible === undefined) {
      this.config.sortConfig.visible = true;
    }
    if (this.config && this.config.viewConfig && this.config.viewConfig.views === undefined) {
      this.config.viewConfig.views = [];
    }
    if (this.config && this.config.viewConfig
        && this.config.viewConfig.currentView === undefined) {
      this.config.viewConfig.currentView = this.config.viewConfig.views[0];
    }
  }

  // Actions

  private handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }

  // Filters

  private clearFilter($event: Filter[]): void {
    this.config.filterConfig.appliedFilters = $event;
    this.onFilterChange.emit({
      appliedFilters: $event
    } as FilterEvent);
  }

  private filterAdded($event: FilterEvent): void {
    let newFilter = {
      field: $event.field,
      query: $event.query,
      value: $event.value
    } as Filter;

    if (!this.filterExists(newFilter)) {
      if (newFilter.field.type === 'select') {
        this.enforceSingleSelect(newFilter);
      }
      this.config.filterConfig.appliedFilters.push(newFilter);
      $event.appliedFilters = this.config.filterConfig.appliedFilters;
      this.onFilterChange.emit($event);
    }
  }

  private filterExists(filter: Filter): boolean {
    let foundFilter = find(this.config.filterConfig.appliedFilters, {
      field: filter.field,
      query: filter.query,
      value: filter.value
    });
    return foundFilter !== undefined;
  }

  private handleFilterFieldSelect($event: FilterEvent): void {
    this.onFilterFiledSelect.emit($event);
  }

  private handleFilterTypeAhead($event: FilterEvent) {
    this.onFilterTypeAhead.emit($event);
  }

  // Sort

  private sortChange($event: SortEvent): void {
    this.onSortChange.emit($event);
  }

  // Views

  private isViewSelected(view: View): boolean {
    return this.config.viewConfig && (this.config.viewConfig.currentView.id === view.id);
  }

  private submit($event: any): void {
    $event.preventDefault();
  }

  private viewSelected (view: View): void {
    this.config.viewConfig.currentView = view;
    if (!view.disabled) {
      this.onViewSelect.emit(view);
    }
  }

  // Utils

  private enforceSingleSelect(filter: Filter): void {
    remove(this.config.filterConfig.appliedFilters, {title: filter.field.title});
  }
}
