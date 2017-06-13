import {
  Component,
  OnInit,
} from '@angular/core';

import { Router } from '@angular/router';

import { Filter } from '../filter';
import { FilterConfig } from '../filter-config';
import { FilterField } from '../filter-field';
import { FilterEvent } from '../filter-event';

@Component({
  selector: 'filter-example',
  templateUrl: './filter-example.component.html'
})
export class FilterExampleComponent implements OnInit {
  allItems: any[];
  imageQueries: any[];
  imageQueriesFixed: any[];
  items: any[];
  filterConfig: FilterConfig;
  filtersText: string = '';
  separator: Object;
  weekDayQueries: any[];

  constructor(private router: Router) {
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

    // Type ahead queries
    this.imageQueries = [{
      id: 'item1',
      value: 'Item 1',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'item2',
      value: 'Item 2',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'item3',
      value: 'Item 3',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }];

    // Non-filterable type ahead queries
    this.imageQueriesFixed = [{
      id: 'item10',
      value: 'Item 10',
      imageUrl: 'https://avatars2.githubusercontent.com/u/21208769?v=3'
    }, {
      id: 'item20',
      value: 'Item 20',
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

    this.filterConfig = {
      fields: [{
        id: 'name',
        title:  'Name',
        placeholder: 'Filter by Name...',
        type: 'text'
      }, {
        id: 'age',
        title:  'Age',
        placeholder: 'Filter by Age...',
        type: 'text'
      }, {
        id: 'address',
        title:  'Address',
        placeholder: 'Filter by Address...',
        type: 'text'
      }, {
        id: 'birthMonth',
        title:  'Birth Month',
        placeholder: 'Filter by Birth Month...',
        type: 'select',
        queries: [{
          id: 'month1',
          value: 'January'
        }, {
          id: 'month2',
          value: 'February'
        }, {
          id: 'month3',
          value: 'March'
        }, {
          id: 'month4',
          value: 'April'
        }, {
          id: 'month5',
          value: 'May'
        }, {
          id: 'month6',
          value: 'June'
        }, {
          id: 'month7',
          value: 'July'
        }, {
          id: 'month8',
          value: 'August'
        }, {
          id: 'month9',
          value: 'September'
        }, {
          id: 'month10',
          value: 'October'
        }, {
          id: 'month11',
          value: 'November'
        }, {
          id: 'month12',
          value: 'December'
        }]
      }, {
        id: 'weekDay',
        title: 'Week Day',
        placeholder: 'Filter by Week Day...',
        type: 'typeahead',
        queries: [
          ...this.weekDayQueries
        ]
      }, {
        id: 'withimage',
        title: 'With Image',
        placeholder: 'Filter by Items...',
        type: 'typeahead',
        queries: [
          ...this.imageQueriesFixed,
          this.separator,
          ...this.imageQueries
        ]
      }, {
        id: 'withicon',
        title: 'With Icon',
        placeholder: 'Filter by Icons...',
        type: 'select',
        queries: [{
          id: 'bookmark',
          value: 'Bookmark',
          iconClass: 'fa-bookmark'
        }, {
          id: 'map',
          value: 'Map',
          iconClass: 'fa-map-marker'
        }, {
          id: 'gift',
          value: 'Gift',
          iconClass: 'fa-gift'
        }]
      }] as FilterField[],
      resultsCount: this.items.length,
      appliedFilters: []
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
    this.filterConfig.resultsCount = this.items.length;
  }

  // Reset filtered queries
  fieldSelected(event: FilterEvent): void {
    this.filterConfig.fields.forEach((field) => {
      if (field.id === 'withimage') {
        field.queries = [
          ...this.imageQueriesFixed,
          this.separator,
          ...this.imageQueries
        ];
      } else if (field.id === 'weekDay') {
        field.queries = [
          ...this.weekDayQueries
        ];
      }
    });
  }

  filterChange(event: FilterEvent): void {
    this.filtersText = '';
    event.appliedFilters.forEach((filter) => {
      this.filtersText += filter.field.title + ' : ' + filter.value + '\n';
    });
    this.applyFilters(event.appliedFilters);
    this.fieldSelected(event);
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
        return false;
      }
    });
    return matches;
  }

  // Filter queries for type ahead
  filterQueries(event: FilterEvent) {
    const index = this.filterConfig.fields.findIndex(i => i.id === event.field.id);
    let val = event.value.trim();

    if (this.filterConfig.fields[index].id === 'withimage') {
      this.filterConfig.fields[index].queries = [
        ...this.imageQueriesFixed,
        this.separator,
        ...this.imageQueries.filter((item: any) => {
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
