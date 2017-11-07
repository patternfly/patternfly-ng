import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../../action/action';
import { ActionConfig } from '../../action/action-config';
import { Filter } from '../../filter/filter';
import { FilterConfig } from '../../filter/filter-config';
import { FilterField } from '../../filter/filter-field';
import { FilterEvent } from '../../filter/filter-event';
import { FilterType } from '../../filter/filter-type';
import { SortConfig } from '../../sort/sort-config';
import { SortField } from '../../sort/sort-field';
import { SortEvent } from '../../sort/sort-event';
import { ToolbarConfig } from '../toolbar-config';
import { ToolbarView } from '../toolbar-view';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'toolbar-example',
  templateUrl: './toolbar-example.component.html'
})
export class ToolbarExampleComponent implements OnInit {
  actionConfig: ActionConfig;
  actionsText: string = '';
  allItems: any[];
  filterConfig: FilterConfig;
  filtersText: string = '';
  items: any[];
  isAscendingSort: boolean = true;
  separator: Object;
  sortConfig: SortConfig;
  currentSortField: SortField;
  toolbarConfig: ToolbarConfig;
  weekDayQueries: any[];

  monthVals: any = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12
  };

  weekDayVals: any = {
    'Sunday': 1,
    'Monday': 2,
    'Tuesday': 3,
    'Wednesday': 4,
    'Thursday': 5,
    'Friday': 6,
    'Saturday': 7
  };

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
        id: 'weekDay',
        title: 'Week Day',
        placeholder: 'Filter by Week Day...',
        type: FilterType.TYPEAHEAD,
        queries: [
          ...this.weekDayQueries
        ]
      }] as FilterField[],
      resultsCount: this.items.length,
      appliedFilters: []
    } as FilterConfig;

    this.sortConfig = {
      fields: [{
        id: 'name',
        title: 'Name',
        sortType: 'alpha'
      }, {
        id: 'address',
        title: 'Address',
        sortType: 'alpha'
      }, {
        id: 'birthMonth',
        title: 'Birth Month',
        sortType: 'alpha'
      }, {
        id: 'weekDay',
        title: 'Week Day',
        sortType: 'alpha'
      }],
      isAscending: this.isAscendingSort
    } as SortConfig;

    this.actionConfig = {
      primaryActions: [{
        id: 'action1',
        title: 'Action 1',
        tooltip: 'Do the first thing'
      }, {
        id: 'action2',
        title: 'Action 2',
        tooltip: 'Do something else'
      }],
      moreActions: [{
        id: 'moreActions1',
        title: 'Action',
        tooltip: 'Perform an action'
      }, {
        id: 'moreActions2',
        title: 'Another Action',
        tooltip: 'Do something else'
      }, {
        disabled: true,
        id: 'moreActions3',
        title: 'Disabled Action',
        tooltip: 'Unavailable action',
      }, {
        id: 'moreActions4',
        title: 'Something Else',
        tooltip: 'Do something special'
      }, {
        id: 'moreActions5',
        title: '',
        separator: true
      }, {
        id: 'moreActions6',
        title: 'Grouped Action 1',
        tooltip: 'Do something'
      }, {
        id: 'moreActions7',
        title: 'Grouped Action 2',
        tooltip: 'Do something similar'
      }]
    } as ActionConfig;

    this.toolbarConfig = {
      actionConfig: this.actionConfig,
      filterConfig: this.filterConfig,
      sortConfig: this.sortConfig,
      views: [{
        id: 'listView',
        iconStyleClass: 'fa fa-th-list',
        tooltip: 'List View'
      }, {
        id: 'tableView',
        iconStyleClass: 'fa fa-table',
        tooltip: 'Table View'
      }]
    } as ToolbarConfig;
  }

  // Actions

  doAdd(): void {
    this.actionsText = 'Add Action\n' + this.actionsText;
  }

  handleAction(action: Action): void {
    this.actionsText = action.title + '\n' + this.actionsText;
  }

  optionSelected(option: number): void {
    this.actionsText = 'Option ' + option + ' selected\n' + this.actionsText;
  }

  // Filter

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
    this.toolbarConfig.filterConfig.resultsCount = this.items.length;
  }

  // Handle filter changes
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
      if (field.id === 'weekDay') {
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

    if (this.filterConfig.fields[index].id === 'weekDay') {
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

  // Sort

  compare(item1: any, item2: any): number {
    let compValue = 0;
    if (this.currentSortField.id === 'name') {
      compValue = item1.name.localeCompare(item2.name);
    } else if (this.currentSortField.id === 'address') {
      compValue = item1.address.localeCompare(item2.address);
    } else if (this.currentSortField.id === 'birthMonth') {
      compValue = this.monthVals[item1.birthMonth] - this.monthVals[item2.birthMonth];
    } else if (this.currentSortField.id === 'weekDay') {
      compValue = this.weekDayVals[item1.weekDay] - this.weekDayVals[item2.weekDay];
    }

    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  // Handle sort changes
  sortChanged($event: SortEvent): void {
    this.currentSortField = $event.field;
    this.isAscendingSort = $event.isAscending;
    this.items.sort((item1: any, item2: any) => this.compare(item1, item2));
  }

  // View

  viewSelected(currentView: ToolbarView): void {
    this.sortConfig.visible = (currentView.id === 'tableView' ? false : true);
  }
}
