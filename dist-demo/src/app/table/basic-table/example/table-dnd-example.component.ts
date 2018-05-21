import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../../../action/action';
import { ActionConfig } from '../../../action/action-config';
import { Filter } from '../../../filter/filter';
import { FilterConfig } from '../../../filter/filter-config';
import { FilterField } from '../../../filter/filter-field';
import { FilterEvent } from '../../../filter/filter-event';
import { FilterType } from '../../../filter/filter-type';
import { PaginationConfig } from '../../../pagination/pagination-config';
import { PaginationEvent } from '../../../pagination/pagination-event';
import { SortConfig } from '../../../sort/sort-config';
import { SortField } from '../../../sort/sort-field';
import { SortEvent } from '../../../sort/sort-event';
import { TableConfig } from '../table-config';
import { TableEvent } from '../../table-event';
import { ToolbarConfig } from '../../../toolbar/toolbar-config';

import { cloneDeep } from 'lodash';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'table-dnd-example',
  templateUrl: './table-dnd-example.component.html'
})
export class TableDndExampleComponent implements OnInit {
  @ViewChild('addressTemplate') addressTemplate: TemplateRef<any>;
  @ViewChild('birthMonthTemplate') birthMonthTemplate: TemplateRef<any>;
  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('weekDayTemplate') weekDayTemplate: TemplateRef<any>;

  actionsText: string = '';
  allRows: any[];
  columns: any[];
  tableConfig: TableConfig;
  rows: any[];

  constructor() {
  }

  ngOnInit(): void {
    this.columns = [{
      cellTemplate: this.nameTemplate,
      draggable: true,
      prop: 'name',
      name: 'Name',
      resizeable: true
    }, {
      cellTemplate: this.addressTemplate,
      draggable: true,
      prop: 'address',
      name: 'Address',
      resizeable: true
    }, {
      cellTemplate: this.birthMonthTemplate,
      draggable: true,
      prop: 'birthMonth',
      name: 'Birth Month',
      resizeable: true
    }, {
      cellTemplate: this.weekDayTemplate,
      draggable: true,
      prop: 'weekDay',
      name: 'Week Day',
      resizeable: true
    }];

    this.allRows = [{
      name: 'Fred Flintstone',
      address: '20 Dinosaur Way, Bedrock, Washingstone',
      birthMonth: 'February',
      birthMonthId: 'month2',
      weekDay: 'Sunday',
      weekdayId: 'day1'
    }, {
      name: 'John Smith',
      address: '415 East Main Street, Norfolk, Virginia',
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
    this.rows = this.allRows;

    this.tableConfig = {
      dragEnabled: true,
      showCheckbox: true
    } as TableConfig;
  }

  // Drag and drop

  handleDrop($event: any[]): void {
    this.allRows = $event;
    this.actionsText = 'Row dropped' + '\n' + this.actionsText;
  }

  // Selection

  handleSelectionChange($event: TableEvent): void {
    this.actionsText = $event.selectedRows.length + ' rows selected\r\n' + this.actionsText;
  }
}
