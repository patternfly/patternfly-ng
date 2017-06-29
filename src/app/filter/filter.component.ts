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
 * Filter component
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-filter',
  styleUrls: ['./filter.component.less'],
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
  /**
   * The filter config containing component properties
   */
  @Input() config: FilterConfig;

  /**
   * The event emitted when a filter has been changed
   */
  @Output('onChange') onChange = new EventEmitter();

  /**
   * The event emitted when a field menu option is selected
   */
  @Output('onFieldSelect') onFilterSelect = new EventEmitter();

  /**
   * The event emitted when the user types ahead in the query input field
   */
  @Output('onTypeAhead') onTypeAhead = new EventEmitter();

  private prevConfig: FilterConfig;

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
    if (this.config === undefined) {
      this.config = {} as FilterConfig;
    }
    this.prevConfig = cloneDeep(this.config);

    if (this.config && this.config.appliedFilters === undefined) {
      this.config.appliedFilters = [];
    }
  }

  // Actions

  private addFilter($event: FilterEvent): void {
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

  private clear($event: Filter[]): void {
    this.config.appliedFilters = $event;
    this.onChange.emit({
      appliedFilters: $event
    } as FilterEvent);
  }

  private enforceSingleSelect(filter: Filter): void {
    remove(this.config.appliedFilters, {title: filter.field.title});
  }

  private fieldSelected($event: FilterEvent): void {
    this.onFilterSelect.emit($event);
  }

  private filterExists(filter: Filter): boolean {
    let foundFilter = find(this.config.appliedFilters, {
      value: filter.value
    });
    return foundFilter !== undefined;
  }

  private typeAhead($event: any) {
    this.onTypeAhead.emit($event);
  }
}
