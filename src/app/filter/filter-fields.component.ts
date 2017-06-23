import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { FilterConfig } from './filter-config';
import { FilterEvent } from './filter-event';
import { FilterField } from './filter-field';
import { FilterQuery } from './filter-query';

import { cloneDeep, find, isEqual } from 'lodash';

/**
 * Component for the filter bar's filter entry components
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-filter-fields',
  styleUrls: ['./filter-fields.component.less'],
  templateUrl: './filter-fields.component.html'
})
export class FilterFieldsComponent implements OnInit {
  @Input() config: FilterConfig;

  @Output('onAdd') onAdd = new EventEmitter();
  @Output('onFieldSelect') onFieldSelect = new EventEmitter();
  @Output('onTypeAhead') onTypeAhead = new EventEmitter();

  currentField: FilterField;
  currentValue: string;
  prevConfig: FilterConfig;
  show: boolean = false;

  constructor() {
  }

  // Initialization

  ngOnInit(): void {
    this.setupConfig();
  }

  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  setupConfig(): void {
    if (this.config === undefined) {
      this.config = {} as FilterConfig;
    }
    this.prevConfig = cloneDeep(this.config);

    if (this.config && this.config.fields === undefined) {
      this.config.fields = [];
    }
    if (this.config && this.config.tooltipPlacement === undefined) {
      this.config.tooltipPlacement = 'top';
    }

    let fieldFound: boolean = false;
    if (this.currentField !== undefined) {
      find(this.config.fields, (nextField) => {
        if (nextField.id === this.currentField.id) {
          fieldFound = true;
          return;
        }
      });
    }
    if (!fieldFound) {
      this.currentField = this.config.fields[0];
      this.currentValue = null;
    }

    if (this.currentValue === undefined) {
      this.currentValue = null;
    }
  }

  // Actions

  fieldInputKeyPress($event: KeyboardEvent): void {
    if ($event.which === 13) {
      this.onAdd.emit({
        field: this.currentField,
        value: this.currentValue
      } as FilterEvent);
      this.currentValue = undefined;
    }
  }

  queryInputChange(value: string) {
    this.onTypeAhead.emit({
      field: this.currentField,
      value: this.currentValue
    } as FilterEvent);
  }

  selectField(field: FilterField): void {
    this.currentField = field;
    this.currentValue = null;
    this.onFieldSelect.emit({
      field: this.currentField,
      value: this.currentValue
    } as FilterEvent);
  }

  selectQuery(filterQuery: FilterQuery): void {
    if (filterQuery != null) {
      this.onAdd.emit({
        field: this.currentField,
        query: filterQuery,
        value: filterQuery.value
      } as FilterEvent);
      this.currentValue = null;
    }
  }
}
