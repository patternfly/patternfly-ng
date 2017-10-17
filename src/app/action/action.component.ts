import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Action } from './action';
import { ActionConfig } from './action-config';

import { cloneDeep, defaults, isEqual } from 'lodash';

/**
 * List actions component.
 *
 * By default, buttons and kebab have no padding so they may inherit stying from components such as list and toolbar.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-action',
  templateUrl: './action.component.html'
})
export class ActionComponent implements DoCheck, OnInit {
  /**
   * The action config containing component properties
   */
  @Input() config: ActionConfig;

  /**
   * Action template for custom actions
   */
  @Input() template: TemplateRef<any>;

  /**
   * The event emitted when an action has been selected
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  private defaultConfig = {
    moreActionsDisabled: false,
    moreActionsVisible: true
  } as ActionConfig;
  private isMoreActionsDropup: boolean = false;
  private prevConfig: ActionConfig;

  /**
   * The default constructor
   *
   * @param el The element reference for this component
   */
  constructor(private el: ElementRef) {}

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

  /**
   * Set up default config
   */
  protected setupConfig(): void {
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }
  }

  // Private

  private handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }

  /**
   * Set flag indicating if kebab should be shown as a dropdown or dropup
   *
   * @param $event The MouseEvent triggering this function
   */
  private initMoreActionsDropup($event: MouseEvent): void {
    window.requestAnimationFrame(() => {
      const kebabContainer = this.closest($event.target, '.dropdown-kebab-pf.open', 'pfng-list-actions');
      const listContainer = this.closest(this.el.nativeElement, '.list-pf', 'pfng-list');
      if (kebabContainer === null || listContainer === null) {
        return;
      }

      const dropdownButton = kebabContainer.querySelector('.dropdown-toggle');
      const dropdownMenu = kebabContainer.querySelector('.dropdown-menu');
      const buttonRect = dropdownButton.getBoundingClientRect();
      const menuRect = dropdownMenu.getBoundingClientRect();
      const menuTop = buttonRect.top - menuRect.height;
      const menuBottom = buttonRect.top + buttonRect.height + menuRect.height;
      const parentRect = listContainer.getBoundingClientRect();

      if (menuBottom <= parentRect.top + parentRect.height || menuTop < parentRect.top) {
        this.isMoreActionsDropup = false;
      } else {
        this.isMoreActionsDropup = true;
      }
    });
  }

  // Utils

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
