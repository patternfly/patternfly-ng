import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { cloneDeep, find } from 'lodash';

import { Filter } from '../filter';
import { FilterComponent } from '../filter.component';
import { FilterConfig } from '../filter-config';
import { FilterField } from '../filter-field';
import { FilterEvent } from '../filter-event';
import { FilterQuery } from '../filter-query';
import { FilterType } from '../filter-type';

@Component({
  selector: 'filter-save-example',
  templateUrl: './filter-save-example.component.html'
})
export class FilterSaveExampleComponent implements OnInit {
  @ViewChild('filter') filter: FilterComponent;

  allItems: any[];
  items: any[];
  filterConfig: FilterConfig;
  filterFields: FilterField[];
  filtersText: string = '';
  monthQueries: any[];
  monthQueriesFixed: any[];
  savedFilters: any = {};
  savedQueries: FilterQuery[];
  separator: Object;
  weekDayQueries: any[];

  constructor() {
  }

  ngOnInit(): void {
    this.allItems = [{
      name: 'Fred Flintstone',
      address: '20 Dinosaur Way, Bedrock, Washingstone',
      birthMonth: 'February',
      birthMonthId: 'month2',
      weekDay: 'Sunday',
      weekdayId: 'day1'
    }, {
      name: 'John Smith', address: '415 East Main Street, Norfolk, Virginia',
      birthMonth: 'October',
      birthMonthId: '10',
      weekDay: 'Monday',
      weekdayId: 'day2'
    }, {
      name: 'Frank Livingston',
      address: '234 Elm Street, Pittsburgh, Pennsylvania',
      birthMonth: 'March',
      birthMonthId: 'month3',
      weekDay: 'Tuesday',
      weekdayId: 'day3'
    }, {
      name: 'Judy Green',
      address: '2 Apple Boulevard, Cincinatti, Ohio',
      birthMonth: 'December',
      birthMonthId: 'month12',
      weekDay: 'Wednesday',
      weekdayId: 'day4'
    }, {
      name: 'Pat Thomas',
      address: '50 Second Street, New York, New York',
      birthMonth: 'February',
      birthMonthId: 'month2',
      weekDay: 'Thursday',
      weekdayId: 'day5'
    }];
    this.items = this.allItems;

    this.monthQueries = [{
      id: 'month3',
      value: 'March',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'month4',
      value: 'April',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'month5',
      value: 'May',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'month6',
      value: 'June',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'month7',
      value: 'July',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'month8',
      value: 'August',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'month9',
      value: 'September',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'month10',
      value: 'October',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'month11',
      value: 'November',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'month12',
      value: 'December',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }];

    // Non-filterable queries
    this.monthQueriesFixed = [{
      id: 'month1',
      value: 'January',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'month2',
      value: 'February',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }];

    // Separator used with type ahead queries
    this.separator = {
      id: 'separator',
      separator: true
    };

    this.weekDayQueries = [{
      id: 'day1',
      value: 'Sunday'
    }, {
      id: 'day2',
      value: 'Monday'
    }, {
      id: 'day3',
      value: 'Tuesday'
    }, {
      id: 'day4',
      value: 'Wednesday'
    }, {
      id: 'day5',
      value: 'Thursday'
    }, {
      id: 'day6',
      value: 'Friday'
    }, {
      id: 'day7',
      value: 'Saturday'
    }];

    this.filterFields = [{
      id: 'birthMonth',
      title: 'Birth Month',
      placeholder: 'Filter by Birth Month...',
      type: FilterType.TYPEAHEAD,
      queries: [
        ...this.monthQueriesFixed,
        this.separator,
        ...this.monthQueries
      ]
    }, {
      id: 'weekDay',
      title: 'Week Day',
      placeholder: 'Filter by Week Day...',
      type: FilterType.TYPEAHEAD,
      queries: [
        ...this.weekDayQueries
      ]
    }, this.separator, {
      id: 'saved',
      title: 'My Filters',
      placeholder: 'Select from custom filters...',
      type: FilterType.TYPEAHEAD
    }];

    this.savedQueries = [{
      showDelete: true,
      value: 'Test1'
    }, {
      showDelete: true,
      value: 'Test2'
    }];

    this.filterConfig = {
      appliedFilters: [],
      fields: this.filterFields,
      resultsCount: this.items.length,
      showSaveFilter: true
    } as FilterConfig;
  }

  // Filter functions

  applyFilters(filters: Filter[]): void {
    this.items = [];
    if (filters && filters.length > 0) {
      this.allItems.forEach((item) => {
        if (this.matchesFilters(item, filters)) {
          this.items.push(item);
        }
      });
    } else {
      this.items = this.allItems;
    }
    this.filterConfig.resultsCount = this.items.length; // for table views
  }

  filterChanged($event: FilterEvent): void {
    this.filtersText = '';
    let filters: Filter[] = [];
    $event.appliedFilters.forEach((appliedFilter) => {
      this.filtersText += appliedFilter.field.title + ' : ' + appliedFilter.value + '\n';

      // Flatten saved filters
      if (appliedFilter.field.id === 'saved') {
        for (const filter of this.savedFilters[appliedFilter.value]) {
          // Prune duplicates
          if (!this.filterExists(filters, filter)) {
            filters.push(filter);
          }
        }
      } else {
        // Prune duplicates
        if (!this.filterExists(filters, appliedFilter)) {
          filters.push(appliedFilter);
        }
      }
    });
    this.applyFilters(filters);
    this.filterConfig.appliedFilters = filters; // Results should show the pruned list of filters
    this.filterFieldSelected($event);
  }

  // Reset filtered queries
  filterFieldSelected($event: FilterEvent): void {
    this.filterConfig.fields.forEach((field) => {
      if (field.id === 'birthMonth') {
        field.queries = [
          ...this.monthQueriesFixed,
          this.separator,
          ...this.monthQueries
        ];
      } else if (field.id === 'weekDay') {
        field.queries = [
          ...this.weekDayQueries
        ];
      } else if (field.id === 'saved') {
        field.queries = [];
        for (const key of Object.keys(this.savedFilters)) {
          field.queries.push({
            showDelete: true,
            value: key
          });
        }
      }
    });
  }

  matchesFilter(item: any, filter: Filter): boolean {
    let match = true;
    if (filter.field.id === 'birthMonth') {
      match = item.birthMonth === filter.value;
    } else if (filter.field.id === 'weekDay') {
      match = item.weekDay === filter.value;
    }
    return match;
  }

  matchesFilters(item: any, filters: Filter[]): boolean {
    let matches = true;
    filters.forEach((filter) => {
      if (!this.matchesFilter(item, filter)) {
        matches = false;
        return matches;
      }
    });
    return matches;
  }

  // Filter queries for type ahead
  filterQueries($event: FilterEvent) {
    const index = (this.filterConfig.fields as any).findIndex((i: any) => i.id === $event.field.id);
    let val = $event.value.trim();

    if (this.filterConfig.fields[index].id === 'birthMonth') {
      this.filterConfig.fields[index].queries = [
        ...this.monthQueriesFixed,
        this.separator,
        ...this.monthQueries.filter((item: any) => {
          if (item.value) {
            return (item.value.toLowerCase().indexOf(val.toLowerCase()) > -1);
          } else {
            return true;
          }
        })
      ];
    } else if (this.filterConfig.fields[index].id === 'weekDay') {
      this.filterConfig.fields[index].queries = [
        ...this.weekDayQueries.filter((item: any) => {
          if (item.value) {
            return (item.value.toLowerCase().indexOf(val.toLowerCase()) > -1);
          } else {
            return true;
          }
        })
      ];
    } else if (this.filterConfig.fields[index].id === 'saved') {
      let queries: FilterQuery[] = [];
      for (const key of Object.keys(this.savedFilters)) {
        queries.push({
          showDelete: true,
          value: key
        });
      }
      this.filterConfig.fields[index].queries = [
        ...queries.filter((item: any) => {
          if (item.value) {
            return (item.value.toLowerCase().indexOf(val.toLowerCase()) > -1);
          } else {
            return true;
          }
        })
      ];
    }
  }

  // Helper to prune duplicate filters
  filterExists(filters: any[], filter: Filter): boolean {
    let foundFilter = find(filters, {
      field: filter.field,
      value: filter.value
    });
    return foundFilter !== undefined;
  }

  // Save filter functionality

  // Delete saved filter
  deleteSavedFilter($event: FilterEvent): void {
    delete this.savedFilters[$event.value]; // Delete saved filter
    this.filterFieldSelected($event); // Refresh queries
    if (Object.keys(this.savedFilters).length === 0) {
      this.filter.resetCurrentField(); // Reset
    }
  }

  // Load saved filters
  loadSavedFilters() {
    let filter1 = {
      field: this.filterConfig.fields[0], // Birth Month
      query: this.monthQueriesFixed[1], // February
      value: this.monthQueriesFixed[1].value
    } as Filter;
    let filter2 = {
      field: this.filterConfig.fields[1], // Week Day
      query: this.weekDayQueries[0], // Sunday
      value: this.weekDayQueries[0].value
    } as Filter;

    // Load filters
    this.savedFilters['Test1'] = [filter1]; // Filter values matching February
    this.savedFilters['Test2'] = [filter1, filter2]; // Filter values matching February and Sunday
    this.filterFieldSelected(null); // Refresh queries
  }

  // Save filter
  saveFilter($event: FilterEvent): void {
    let filters: Filter[] = [];
    $event.appliedFilters.forEach((filter) => {
      // Flatten saved filters
      if (filter.field.id === 'saved') {
        for (const item of this.savedFilters[filter.value]) {
          filters.push(item);
        }
      } else {
        filters.push(filter);
      }
    });
    this.savedFilters[$event.value] = filters;
    this.filterFieldSelected($event); // Refresh queries
  }
}
