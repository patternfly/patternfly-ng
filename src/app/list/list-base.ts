import {
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import { Action } from '../action/action';
import { ListBaseConfig } from './list-base-config';
import { ListEvent } from './list-event';

/**
 * List base component
 */
export abstract class ListBase {
  /**
   * The name of the template containing actions for each item
   */
  @Input() actionTemplate: TemplateRef<any>;

  /**
   * An array of items to display in the list
   */
  @Input() items: any[];

  /**
   * The name of the template containing item layout
   */
  @Input() itemTemplate: TemplateRef<any>;

  /**
   * The event emitted when an action (e.g., button, kebab, etc.) has been selected
   */
  @Output('onActionSelect') onActionSelect = new EventEmitter();

  /**
   * The event emitted when an item has been clicked
   */
  @Output('onClick') onClick = new EventEmitter();

  /**
   * The event emitted when an item is double clicked
   */
  @Output('onDblClick') onDblClick = new EventEmitter();

  /**
   * The event emitted when an item selection has been changed
   */
  @Output('onSelectionChange') onSelectionChange = new EventEmitter();

  /**
   * The default constructor
   */
  constructor() {
  }

  // Initialization

  /**
   * Set up default config
   */
  protected setupConfig(): void {
    let config = this.getConfig();
    if (config.multiSelect === undefined || config.multiSelect === false) {
      let items = this.getSelectedItems(this.items);
      if (items.length > 0) {
        this.selectSingleItem(items[0]);
      }
    }
    if (config.multiSelect && config.dblClick) {
      throw new Error('ListComponent - Illegal use: ' +
        'Cannot use both multi-select and double click selection at the same time.');
    }
    if (config.selectItems && config.showCheckbox) {
      throw new Error('ListComponent - Illegal use: ' +
        'Cannot use both checkbox and click selection at the same time.');
    }
  }

  /**
   * Return component config
   *
   * @returns {ListBaseConfig} The component config
   */
  protected abstract getConfig(): ListBaseConfig;

  // Getters & setters

  /**
   * Get the flag indicating list has no items
   *
   * @returns {boolean} The flag indicating list has no items
   */
  get itemsEmpty(): boolean {
    return !(this.items !== undefined && this.items.length > 0);
  }

  // Actions

  /**
   * Helper to generate action select event
   *
   * @param {Action} action The selected action
   */
  protected handleAction(action: Action): void {
    if (action && action.disabled !== true) {
      this.onActionSelect.emit(action);
    }
  }

  // Selection

  /**
   * Helper to generate selection change event
   *
   * @param item The selected item
   */
  protected checkboxChange(item: any): void {
    this.onSelectionChange.emit({
      item: item,
      selectedItems: this.getSelectedItems(this.items)
    } as ListEvent);
  }

  /**
   * Helper to generate double click event
   *
   * @param {MouseEvent} $event The triggered event
   * @param item The double clicked item
   */
  protected dblClick($event: MouseEvent, item: any): void {
    let config = this.getConfig();
    if (config.dblClick === true) {
      this.onDblClick.emit({
        item: item
      } as ListEvent);
    }
  }

  /**
   * Helper to deselect given items items and children
   *
   * @param {any[]} items The items to be deselected
   */
  protected deselectItems(items: any[]): void {
    for (let i = 0; i < items.length; i++) {
      items[i].selected = false;
      if (Array.isArray(items[i].children)) {
        this.deselectItems(items[i].children);
      }
    }
  }

  /**
   * Helper to retrieve selected items
   *
   * @param {any[]} items The items containing possible selections
   * @returns {any[]} A list of selected items
   */
  protected getSelectedItems(items: any[]): any[] {
    let selectedItems = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].selected) {
        selectedItems.push(items[i]);
      }
      if (Array.isArray(items[i].children)) {
        let selectedChildren = this.getSelectedItems(items[i].children);
        selectedItems = selectedItems.concat(selectedChildren);
      }
    }
    return selectedItems;
  }

  /**
   * Helper to select a single item and deselect all others
   *
   * @param item The item to select
   */
  protected selectSingleItem(item: any): void {
    this.deselectItems(this.items);
    item.selected = true;
  }

  /**
   * Select or deselect an item
   *
   * @param item The item to select or deselect
   * @param {boolean} selected True if item should be selected
   */
  selectItem(item: any, selected: boolean): void {
    let config = this.getConfig();

    // Are we using checkboxes?
    if (config.showCheckbox) {
      item.selected = selected;
      return;
    }

    // Multiple item selection
    if (config.multiSelect && !config.dblClick) {
      item.selected = selected;
    } else {
      // Single item selection
      this.deselectItems(this.items);
      this.selectSingleItem(item);
    }
  }

  /**
   * Helper to toggle item selection
   *
   * @param {MouseEvent} $event The triggered event
   * @param item The item to select
   */
  protected toggleSelection($event: MouseEvent, item: any): void {
    let config = this.getConfig();
    let selectionChanged = false;

    // Always emit click event
    this.onClick.emit({
      item: item
    } as ListEvent);

    // Go no further if click selection isn't enabled
    if (!config.selectItems) {
      return;
    }

    // Multiple item selection
    if (config.multiSelect && !config.dblClick) {
      // Item's 'selected' prop may be undefined initially
      if (item.selected === true) {
        item.selected = false;
      } else {
        item.selected = true;
      }
      selectionChanged = true;
    } else {
      // Single item selection
      if (item.selected === true) {
        // Avoid accidentally deselecting by dblClick
        if (!config.dblClick) {
          this.deselectItems(this.items);
          selectionChanged = true;
        }
      } else {
        this.selectSingleItem(item);
        selectionChanged = true;
      }
    }

    // Emit event only if selection changed
    if (selectionChanged === true) {
      this.onSelectionChange.emit({
        item: item,
        selectedItems: this.getSelectedItems(this.items)
      } as ListEvent);
    }
  }
}
