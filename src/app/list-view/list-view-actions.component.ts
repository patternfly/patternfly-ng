import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { Action } from '../models/action';
import { ActionsConfig } from '../models/actions-config';

import { cloneDeep, defaults, isEqual } from 'lodash';

/**
 * List view actions component.
 *
 * config - The ActionsConfig object containing action properties
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-list-view-actions',
  styleUrls: ['./list-view-actions.component.less'],
  templateUrl: './list-view-actions.component.html'
})
export class ListViewActionsComponent implements OnInit {
  @Input() config: ActionsConfig;

  @Output('onActionSelect') onActionSelect = new EventEmitter();

  defaultConfig = {
    moreActionsDisabled: false,
    moreActionsVisible: true
  } as ActionsConfig;
  isMoreActionsDropup: boolean = false;
  prevConfig: ActionsConfig;

  constructor(private el: ElementRef) {
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
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }
  }

  // Actions

  handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }

  /**
   * Set flag indicating if kebab should be shown as a dropdown or dropup
   *
   * @param $event The MouseEvent triggering this function
   */
  initMoreActionsDropup($event: MouseEvent): void {
    window.requestAnimationFrame(() => {
      let kebabContainer = this.closest($event.target, '.dropdown-kebab-pf.open', 'pfng-list-view-actions');
      let listViewContainer = this.closest(this.el.nativeElement, '.list-group.list-view-pf', 'pfng-list-view');
      if (kebabContainer === null || listViewContainer === null) {
        return;
      }

      let dropdownButton = kebabContainer.querySelector('.dropdown-toggle');
      let dropdownMenu =  kebabContainer.querySelector('.dropdown-menu');
      let buttonRect = dropdownButton.getBoundingClientRect();
      let menuRect = dropdownMenu.getBoundingClientRect();
      let menuTop = buttonRect.top - menuRect.height;
      let menuBottom = buttonRect.top + buttonRect.height + menuRect.height;
      let parentRect = listViewContainer.getBoundingClientRect();

      if ((menuBottom <= parentRect.top + parentRect.height) || (menuTop < parentRect.top)) {
        this.isMoreActionsDropup = false;
      } else {
        this.isMoreActionsDropup = true;
      }
    });
  }

  // Private

  /**
   * Get the closest ancestor based on given selector
   *
   * @param el The HTML element to start searching for matching ancestor
   * @param selector The selector to match
   * @param stopSelector If this selector is matched, the search is stopped
   * @returns {HTMLElement} The matching HTML element or null if not found
   */
  private closest(el: any, selector: string, stopSelector: string): HTMLElement {
    let retval = null;
    while (el) {
      if (el.matches(selector)) {
        retval = el;
        break;
      } else if (stopSelector && el.matches(stopSelector)) {
        break;
      }
      el = el.parentElement;
    }
    return retval;
  }
}
