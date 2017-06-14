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

import * as _ from 'lodash';

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
  @Input() config: FilterConfig;

  @Output('onClear') onClear = new EventEmitter();

  prevConfig: FilterConfig;

  constructor() {
  }

  // Initialization

  ngOnInit(): void {
    this.setupConfig();
  }

  ngDoCheck(): void {
    // Do a deep compare on config
    if (!_.isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  setupConfig(): void {
    if (this.config === undefined) {
      this.config = {} as FilterConfig;
    }
    this.prevConfig = _.cloneDeep(this.config);

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

  // Result functions

  clearFilter(filter: Filter): void {
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

  clearAllFilters(): void {
    this.config.appliedFilters = [];
    this.onClear.emit(this.config.appliedFilters);
  }
}
