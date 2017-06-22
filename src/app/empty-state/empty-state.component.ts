import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../models/action';
import { EmptyStateConfig } from './empty-state-config';

import * as _ from 'lodash';

/**
 * Empty state component.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-empty-state',
  styleUrls: ['./empty-state.component.less'],
  templateUrl: './empty-state.component.html'
})
export class EmptyStateComponent implements OnInit {
  @Input() config: EmptyStateConfig;

  @Output('onActionSelect') onActionSelect = new EventEmitter();

  defaultConfig = {
    title: 'No Items Available'
  } as EmptyStateConfig;
  prevConfig: EmptyStateConfig;

  constructor() {
  }

  // Initialization

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
    if (this.config !== undefined) {
      _.defaults(this.config, this.defaultConfig);
    } else {
      this.config = _.cloneDeep(this.defaultConfig);
    }
    this.prevConfig = _.cloneDeep(this.config);
  }

  // Action functions

  handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }
}
