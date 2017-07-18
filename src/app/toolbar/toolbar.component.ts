import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../action/action';
import { Filter } from '../filter/filter';
import { FilterEvent } from '../filter/filter-event';
import { SortEvent } from '../sort/sort-event';
import { ToolbarConfig } from './toolbar-config';
import { ToolbarView } from './toolbar-view';

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
  @Input() actionTemplate: TemplateRef<any>;

  /**
   * The name of the template containing views
   */
  @Input() viewTemplate: TemplateRef<any>;

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

  /**
   * Set up default config
   */
  protected setupConfig(): void {
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
    if (this.config && this.config.views === undefined) {
      this.config.views = [];
    }
    if (this.config && this.config.view === undefined) {
      this.config.view = this.config.views[0];
    }
  }

  // Getters & setters



  // Actions

  /**
   * Handle clear filter event
   *
   * @param $event An array of current Filter objects
   */
  clearFilter($event: Filter[]): void {
    this.config.filterConfig.appliedFilters = $event;
    this.onFilterChange.emit({
      appliedFilters: $event
    } as FilterEvent);
  }

  // Private

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

  private handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }

  private handleFilterFieldSelect($event: FilterEvent): void {
    this.onFilterFieldSelect.emit($event);
  }

  private handleFilterTypeAhead($event: FilterEvent) {
    this.onFilterTypeAhead.emit($event);
  }

  private sortChange($event: SortEvent): void {
    this.onSortChange.emit($event);
  }

  private isViewSelected(currentView: ToolbarView): boolean {
    return this.config.view && this.config.view.id === currentView.id;
  }

  private viewSelected (currentView: ToolbarView): void {
    this.config.view = currentView;
    if (!currentView.disabled) {
      this.onViewSelect.emit(currentView);
    }
  }

  // Utils

  private enforceSingleSelect(filter: Filter): void {
    remove(this.config.filterConfig.appliedFilters, {title: filter.field.title});
  }
}
