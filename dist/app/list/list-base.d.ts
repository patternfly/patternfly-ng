import { EventEmitter, TemplateRef } from '@angular/core';
import { Action } from '../action/action';
import { ListConfigBase } from './list-config-base';
/**
 * List base
 */
export declare abstract class ListBase {
    /**
     * The name of the template containing actions for each item
     */
    actionTemplate: TemplateRef<any>;
    /**
     * An array of items to display in the list
     */
    items: any[];
    /**
     * The name of the template containing item layout
     */
    itemTemplate: TemplateRef<any>;
    /**
     * The event emitted when an action (e.g., button, kebab, etc.) has been selected
     */
    onActionSelect: EventEmitter<{}>;
    /**
     * The event emitted when an item has been clicked
     */
    onClick: EventEmitter<{}>;
    /**
     * The event emitted when an item is double clicked
     */
    onDblClick: EventEmitter<{}>;
    /**
     * The event emitted when an item selection has been changed
     */
    onSelectionChange: EventEmitter<{}>;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Set up default config
     */
    protected setupConfig(): void;
    /**
     * Return component config
     *
     * @returns {ListConfigBase} The component config
     */
    protected abstract getConfig(): ListConfigBase;
    /**
     * Get the flag indicating list has no items
     *
     * @returns {boolean} The flag indicating list has no items
     */
    readonly itemsEmpty: boolean;
    /**
     * Helper to generate action select event
     *
     * @param {Action} action The selected action
     */
    protected handleAction(action: Action): void;
    /**
     * Helper to generate selection change event
     *
     * @param item The selected item
     */
    protected checkboxChange(item: any): void;
    /**
     * Helper to generate double click event
     *
     * @param {MouseEvent} $event The triggered event
     * @param item The double clicked item
     */
    protected dblClick($event: MouseEvent, item: any): void;
    /**
     * Helper to deselect given items items and children
     *
     * @param {any[]} items The items to be deselected
     */
    protected deselectItems(items: any[]): void;
    /**
     * Helper to retrieve selected items
     *
     * @param {any[]} items The items containing possible selections
     * @returns {any[]} A list of selected items
     */
    protected getSelectedItems(items: any[]): any[];
    /**
     * Helper to generate selection change event
     *
     * @param item The selected item
     */
    protected radioButtonChange(item: any): void;
    /**
     * Helper to select a single item and deselect all others
     *
     * @param item The item to select
     */
    protected selectSingleItem(item: any): void;
    /**
     * Select or deselect an item
     *
     * @param item The item to select or deselect
     * @param {boolean} selected True if item should be selected
     */
    selectItem(item: any, selected: boolean): void;
    /**
     * Helper to toggle item selection
     *
     * @param {MouseEvent} $event The triggered event
     * @param item The item to select
     */
    protected toggleSelection($event: MouseEvent, item: any): void;
}
