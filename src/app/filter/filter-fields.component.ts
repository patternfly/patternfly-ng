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
 * Component for the filter query field and filter query dropdown
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-filter-fields',
  styleUrls: ['./filter-fields.component.less'],
  templateUrl: './filter-fields.component.html'
})
export class FilterFieldsComponent implements OnInit {
  /**
   * The filter config containing component properties
   */
  @Input() config: FilterConfig;

  /**
   * The event emitted when a filter has been added
   */
  @Output('onAdd') onAdd = new EventEmitter();

  /**
   * The event emitted when a field menu option is selected
   */
  @Output('onFieldSelect') onFieldSelect = new EventEmitter();

  /**
   * The event emitted when the user types ahead in the query input field
   */
  @Output('onTypeAhead') onTypeAhead = new EventEmitter();

  private currentField: FilterField;
  private currentValue: string;
  private prevConfig: FilterConfig;

  /**
   * The default constructor
   */
  constructor() {
  }

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
  }

  /**
   *  Check if the component config has changed
   */
  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  private setupConfig(): void {
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

  private fieldInputKeyPress($event: KeyboardEvent): void {
    if ($event.which === 13) {
      this.onAdd.emit({
        field: this.currentField,
        value: this.currentValue
      } as FilterEvent);
      this.currentValue = undefined;
    }
  }

  private queryInputChange(value: string) {
    this.onTypeAhead.emit({
      field: this.currentField,
      value: this.currentValue
    } as FilterEvent);
  }

  private selectField(field: FilterField): void {
    this.currentField = field;
    this.currentValue = null;
    this.onFieldSelect.emit({
      field: this.currentField,
      value: this.currentValue
    } as FilterEvent);
  }

  private selectQuery(filterQuery: FilterQuery): void {
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
