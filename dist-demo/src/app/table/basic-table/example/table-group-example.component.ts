import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NgxDataTableConfig } from '../ngx-datatable-config';
import { TableConfig } from '../table-config';

import { cloneDeep } from 'lodash';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'table-group-example',
  templateUrl: './table-group-example.component.html'
})
export class TableGroupExampleComponent implements OnInit {
  @ViewChild('addressTemplate') addressTemplate: TemplateRef<any>;
  @ViewChild('birthMonthTemplate') birthMonthTemplate: TemplateRef<any>;
  @ViewChild('groupHeaderTemplate') groupHeaderTemplate: TemplateRef<any>;
  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('weekDayTemplate') weekDayTemplate: TemplateRef<any>;

  allRows: any[];
  columns: any[];
  dataTableConfig: NgxDataTableConfig;
  rows: any[];
  tableConfig: TableConfig;

  constructor() {
  }

  ngOnInit(): void {
    this.columns = [{
      cellTemplate: this.nameTemplate,
      draggable: true,
      prop: 'name',
      name: 'Name',
      resizeable: true,
      sortable: false // n/a with group header
    }, {
      cellTemplate: this.addressTemplate,
      draggable: true,
      prop: 'address',
      name: 'Address',
      resizeable: true,
      sortable: false // n/a with group header
    }, {
      cellTemplate: this.birthMonthTemplate,
      draggable: true,
      prop: 'birthMonth',
      name: 'Birth Month',
      resizeable: true,
      sortable: false // n/a with group header
    }, {
      cellTemplate: this.weekDayTemplate,
      draggable: true,
      prop: 'weekDay',
      name: 'Week Day',
      resizeable: true,
      sortable: false // n/a with group header
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
      showCheckbox: false
    } as TableConfig;

    this.dataTableConfig = {
      groupExpansionDefault: true,
      groupRowsBy: 'birthMonth'
    } as NgxDataTableConfig;
  }
}
