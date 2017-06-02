import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import * as _ from 'lodash';

import { SortConfig } from './sort-config';
import { SortField } from './sort-field';
import { SortEvent } from './sort-event';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'alm-sort',
  styleUrls: ['./sort.component.less'],
  templateUrl: './sort.component.html'
})
export class SortComponent implements OnInit {
  @Input() config: SortConfig;

  @Output('onChange') onChange = new EventEmitter();

  show: boolean = false;
  currentField: SortField;
  prevConfig: SortConfig;

  constructor() {
  }

  ngOnInit(): void {
    this.setupConfig();
  }

  ngDoCheck(): void {
    // Do a deep compare on config
    if (!_.isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  setupConfig(): void {
    this.prevConfig = _.cloneDeep(this.config);

    if (this.config && this.config.fields === undefined) {
      this.config.fields = [];
    }
    if (this.config && this.config.fields.length > 0) {
      if (this.currentField === undefined) {
        this.currentField = this.config.fields[0];
      }
      if (this.config.isAscending === undefined) {
        this.config.isAscending = true;
      }
    }
  }

  toggle(): void {
    this.show = !this.show;
  }

  open(): void {
    this.show = true;
  }

  close(): void {
    this.show = false;
  }

  getSortIconClass(): string {
    let iconClass: string;
    if (this.currentField.sortType === 'numeric') {
      if (this.config.isAscending) {
        iconClass = 'fa fa-sort-numeric-asc';
      } else {
        iconClass = 'fa fa-sort-numeric-desc';
      }
    } else {
      if (this.config.isAscending) {
        iconClass = 'fa fa-sort-alpha-asc';
      } else {
        iconClass = 'fa fa-sort-alpha-desc';
      }
    }
    return iconClass;
  }

  onChangeDirection(): void {
    this.config.isAscending = !this.config.isAscending;
    this.onChange.emit({
      field: this.currentField,
      isAscending: this.config.isAscending
    } as SortEvent);
    this.toggle();
  }

  selectField(field: SortField): void {
    this.currentField = field;
    this.onChange.emit({
      field: this.currentField,
      isAscending: this.config.isAscending
    } as SortEvent);
  }
}
