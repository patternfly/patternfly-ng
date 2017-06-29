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

import { cloneDeep, defaults, isEqual } from 'lodash';

/**
 * Component for rendering an empty state.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-empty-state',
  styleUrls: ['./empty-state.component.less'],
  templateUrl: './empty-state.component.html'
})
export class EmptyStateComponent implements OnInit {
  /**
   * The empty state config containing component properties
   */
  @Input() config: EmptyStateConfig;

  /**
   * The event emitted when an action is selected
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  private defaultConfig = {
    title: 'No Items Available'
  } as EmptyStateConfig;
  private prevConfig: EmptyStateConfig;

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
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }
    this.prevConfig = cloneDeep(this.config);
  }

  // Actions

  private handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }
}
