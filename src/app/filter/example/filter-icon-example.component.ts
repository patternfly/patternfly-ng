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
  selector: 'filter-icon-example',
  templateUrl: './filter-icon-example.component.html'
})
export class FilterIconExampleComponent implements OnInit {
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
      icon: 'bookmark',
      iconStyleClass: 'fa fa-bookmark',
      weekDay: 'Sunday',
      weekdayId: 'day1'
    }, {
      name: 'John Smith', address: '415 East Main Street, Norfolk, Virginia',
      birthMonth: 'October',
      birthMonthId: '10',
      icon: 'map',
      iconStyleClass: 'fa fa-map-marker',
      weekDay: 'Monday',
      weekdayId: 'day2'
    }, {
      name: 'Frank Livingston',
      address: '234 Elm Street, Pittsburgh, Pennsylvania',
      birthMonth: 'March',
      birthMonthId: 'month3',
      icon: 'gift',
      iconStyleClass: 'fa fa-gift',
      weekDay: 'Tuesday',
      weekdayId: 'day3'
    }, {
      name: 'Judy Green',
      address: '2 Apple Boulevard, Cincinatti, Ohio',
      birthMonth: 'December',
      birthMonthId: 'month12',
      icon: 'map',
      iconStyleClass: 'fa fa-map-marker',
      weekDay: 'Wednesday',
      weekdayId: 'day4'
    }, {
      name: 'Pat Thomas',
      address: '50 Second Street, New York, New York',
      birthMonth: 'February',
      birthMonthId: 'month2',
      icon: 'bookmark',
      iconStyleClass: 'fa fa-bookmark',
      weekDay: 'Thursday',
      weekdayId: 'day5'
    }];
    this.items = this.allItems;

    this.filterConfig = {
      fields: [{
        id: 'icon',
        title: 'By Icon',
        placeholder: 'Filter by Icon...',
        type: FilterType.SELECT,
        queries: [{
          id: 'bookmark',
          value: 'bookmark',
          iconStyleClass: 'fa fa-bookmark'
        }, {
          id: 'map',
          value: 'map',
          iconStyleClass: 'fa fa-map-marker'
        }, {
          id: 'gift',
          value: 'gift',
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
    if (filter.field.id === 'icon') {
      match = item.icon === filter.value;
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
