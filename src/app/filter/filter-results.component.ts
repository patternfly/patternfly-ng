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

import { cloneDeep, isEqual } from 'lodash';

/**
 * Component for the filter results
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-filter-results',
  styleUrls: ['./filter-results.component.less'],
  templateUrl: './filter-results.component.html'
})
export class FilterResultsComponent implements OnInit {
  /**
   * The filter config containing component properties
   */
  @Input() config: FilterConfig;

  /**
   * The event emitted when the clear action is selected
   */
  @Output('onClear') onClear = new EventEmitter();

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
    if (this.config && this.config.resultsCount === undefined) {
      this.config.resultsCount = 0;
    }
    if (this.config && this.config.selectedCount === undefined) {
      this.config.selectedCount = 0;
    }
    if (this.config && this.config.totalCount === undefined) {
      this.config.totalCount = 0;
    }
  }

  // Actions

  private clearFilter(filter: Filter): void {
    let newFilters: Filter[] = [];
    this.config.appliedFilters.forEach((appliedFilter) => {
      if (appliedFilter.field.title !== filter.field.title
          || appliedFilter.value !== filter.value) {
        newFilters.push(appliedFilter);
      }
    });
    this.config.appliedFilters = newFilters;
    this.onClear.emit(this.config.appliedFilters);
  }

  private clearAllFilters(): void {
    this.config.appliedFilters = [];
    this.onClear.emit(this.config.appliedFilters);
  }
}
