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
  selector: 'filter-basic-example',
  templateUrl: './filter-basic-example.component.html'
})
export class FilterBasicExampleComponent implements OnInit {
  allItems: any[];
  items: any[];
  filterConfig: FilterConfig;
  filtersText: string = '';
  separator: Object;

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

    this.filterConfig = {
      fields: [{
        id: 'name',
        title: 'Name',
        placeholder: 'Filter by Name...',
        type: FilterType.TEXT
      }, {
        id: 'address',
        title: 'Address',
        placeholder: 'Filter by Address...',
        type: FilterType.TEXT
      }, {
        id: 'birthMonth',
        title: 'Birth Month',
        placeholder: 'Filter by Birth Month...',
        type: FilterType.SELECT,
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
        id: 'byIcon',
        title: 'By Icon',
        placeholder: 'Filter by Icon...',
        type: FilterType.SELECT,
        queries: [{
          id: 'bookmark',
          value: 'Bookmark',
          iconStyleClass: 'fa fa-bookmark'
        }, {
          id: 'map',
          value: 'Map',
          iconStyleClass: 'fa fa-map-marker'
        }, {
          id: 'gift',
          value: 'Gift',
          iconStyleClass: 'fa fa-gift'
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

  filterChanged($event: FilterEvent): void {
    this.filtersText = '';
    $event.appliedFilters.forEach((filter) => {
      this.filtersText += filter.field.title + ' : ' + filter.value + '\n';
    });
    this.applyFilters($event.appliedFilters);
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
}
