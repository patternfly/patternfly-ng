import {
  Component,
  OnInit,
} from '@angular/core';

import { Filter } from '../filter';
import { FilterConfig } from '../filter-config';
import { FilterField } from '../filter-field';
import { FilterEvent } from '../filter-event';
import { FilterType } from '../filter-type';

@Component({
  selector: 'filter-lazy-example',
  templateUrl: './filter-lazy-example.component.html'
})
export class FilterLazyExampleComponent implements OnInit {
  allItems: any[];
  items: any[];
  filterConfig: FilterConfig;
  filterFields: FilterField[];
  filtersText: string = '';
  lazyFilterFields: FilterField[];
  monthQueries: any[];
  monthQueriesFixed: any[];
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
    }];

    this.lazyFilterFields = [{
      id: 'name',
      title: 'Name',
      placeholder: 'Filter by Name...',
      type: FilterType.TEXT
    }, {
      id: 'address',
      title: 'Address',
      placeholder: 'Filter by Address...',
      type: FilterType.TEXT,
    }, {
      id: 'weekDay',
      title: 'Week Day',
      placeholder: 'Filter by Week Day...',
      type: FilterType.TYPEAHEAD,
      queries: [
        ...this.weekDayQueries
      ]
    }];

    this.filterConfig = {
      fields: [
        ...this.filterFields
      ] as FilterField[],
      resultsCount: this.items.length,
      appliedFilters: []
    } as FilterConfig;
  }

  // Filter functions

  loadFilters(): void {
    this.filterConfig.fields = this.filterFields.concat(this.lazyFilterFields);
  }

  replaceFilters(): void {
    this.filterConfig.fields = this.lazyFilterFields;
  }

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
    this.filterConfig.resultsCount = this.items.length;
  }

  filterChanged($event: FilterEvent): void {
    this.filtersText = '';
    $event.appliedFilters.forEach((filter) => {
      this.filtersText += filter.field.title + ' : ' + filter.value + '\n';
    });
    this.applyFilters($event.appliedFilters);
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
      }
    });
  }

  matchesFilter(item: any, filter: Filter): boolean {
    let match = true;
    if (filter.field.id === 'name') {
      match = item.name.match(filter.value) !== null;
    } else if (filter.field.id === 'address') {
      match = item.address.match(filter.value) !== null;
    } else if (filter.field.id === 'birthMonth') {
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
    }
  }
}
