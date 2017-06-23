import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { Filter } from './filter';
import { FilterConfig } from './filter-config';
import { FilterEvent } from './filter-event';

import { cloneDeep, find, isEqual, remove } from 'lodash';

/**
 * Component for the filter bar's filter entry components
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-filter',
  styleUrls: ['./filter.component.less'],
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
  @Input() config: FilterConfig;

  @Output('onChange') onChange = new EventEmitter();
  @Output('onFieldSelect') onFilterSelect = new EventEmitter();
  @Output('onTypeAhead') onTypeAhead = new EventEmitter();

  prevConfig: FilterConfig;

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
    if (this.config === undefined) {
      this.config = {} as FilterConfig;
    }
    this.prevConfig = cloneDeep(this.config);

    if (this.config && this.config.appliedFilters === undefined) {
      this.config.appliedFilters = [];
    }
  }

  // Filter functions

  addFilter($event: FilterEvent): void {
    let newFilter = {
      field: $event.field,
      query: $event.query,
      value: $event.value
    } as Filter;

    if (!this.filterExists(newFilter)) {
      if (newFilter.field.type === 'select') {
        this.enforceSingleSelect(newFilter);
      }
      this.config.appliedFilters.push(newFilter);
      $event.appliedFilters = this.config.appliedFilters;
      this.onChange.emit($event);
    }
  }

  clear($event: Filter[]): void {
    this.config.appliedFilters = $event;
    this.onChange.emit({
      appliedFilters: $event
    } as FilterEvent);
  }

  fieldSelected($event: FilterEvent): void {
    this.onFilterSelect.emit($event);
  }

  filterExists(filter: Filter): boolean {
    let foundFilter = find(this.config.appliedFilters, {
      value: filter.value
    });
    return foundFilter !== undefined;
  }

  typeAhead($event: any) {
    this.onTypeAhead.emit($event);
  }

  // Private

  private enforceSingleSelect(filter: Filter): void {
    remove(this.config.appliedFilters, {title: filter.field.title});
  }
}
