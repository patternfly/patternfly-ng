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
import { Filter } from '../filters/filter';
import { FilterEvent } from '../filters/filter-event';
import { SortEvent } from '../sort/sort-event';
import { ToolbarConfig } from './toolbar-config';
import { View } from '../models/view';

import { cloneDeep, defaults, find, isEqual, remove } from 'lodash';

/**
 * Standard toolbar component. Includes filtering and view selection capabilities
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-toolbar',
  styleUrls: ['./toolbar.component.less'],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
  @Input() config: ToolbarConfig;
  @Input() actionsTemplate: TemplateRef<any>;
  @Input() viewsTemplate: TemplateRef<any>;

  @Output('onActionSelect') onActionSelect = new EventEmitter();
  @Output('onFilterFieldSelect') onFilterFiledSelect = new EventEmitter();
  @Output('onFilterChange') onFilterChange = new EventEmitter();
  @Output('onFilterTypeAhead') onFilterTypeAhead = new EventEmitter();
  @Output('onSortChange') onSortChange = new EventEmitter();
  @Output('onViewSelect') onViewSelect = new EventEmitter();

  defaultConfig: ToolbarConfig = {} as ToolbarConfig;
  prevConfig: ToolbarConfig;

  constructor() {
  }

  // Initialization

  ngOnInit(): void {
    this.setupConfig();
  }

  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  setupConfig(): void {
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
    if (this.config.sortConfig !== undefined && this.config.sortConfig.show === undefined) {
      this.config.sortConfig.show = true;
    }
    if (this.config && this.config.viewsConfig && this.config.viewsConfig.views === undefined) {
      this.config.viewsConfig.views = [];
    }
    if (this.config && this.config.viewsConfig
        && this.config.viewsConfig.currentView === undefined) {
      this.config.viewsConfig.currentView = this.config.viewsConfig.views[0];
    }
  }

  // Action functions

  handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }

  // Filter functions

  clearFilter($event: Filter[]): void {
    this.config.filterConfig.appliedFilters = $event;
    this.onFilterChange.emit({
      appliedFilters: $event
    } as FilterEvent);
  }

  filterAdded($event: FilterEvent): void {
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
  
  filterExists(filter: Filter): boolean {
    let foundFilter = find(this.config.filterConfig.appliedFilters, {
      field: filter.field,
      query: filter.query,
      value: filter.value
    });
    return foundFilter !== undefined;
  }

  handleFilterFieldSelect($event: FilterEvent): void {
    this.onFilterFiledSelect.emit($event);
  }

  handleFilterTypeAhead($event: FilterEvent) {
    this.onFilterTypeAhead.emit($event);
  }

  // Sort functions

  sortChange($event: SortEvent): void {
    this.onSortChange.emit($event);
  }

  // View functions

  isViewSelected(view: View): boolean {
    return this.config.viewsConfig && (this.config.viewsConfig.currentView.id === view.id);
  }

  submit($event: any): void {
    $event.preventDefault();
  }

  viewSelected (view: View): void {
    this.config.viewsConfig.currentView = view;
    if (!view.disabled) {
      this.onViewSelect.emit(view);
    }
  }

  // Private

  private enforceSingleSelect(filter: Filter): void {
    remove(this.config.filterConfig.appliedFilters, {title: filter.field.title});
  }
}
