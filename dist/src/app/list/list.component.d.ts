import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ListConfig } from './list-config';
/**
 * List component
 *
 * For items, use a template named itemTemplate to contain content for each item. For each item in the items array, the
 * expansion can be disabled by setting disabled to true on the item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each item. If using expand items, use a template
 * named itemExpandedTemplate to contain expandable content for each item.
 */
export declare class ListComponent implements OnInit {
    /**
     * The name of the template containing actions for each item
     */
    actionTemplate: TemplateRef<any>;
    /**
     * The list config containing component properties
     */
    config: ListConfig;
    /**
     * An array of items to display in the list
     */
    items: any[];
    /**
     * The name of the template containing items for each item
     */
    itemTemplate: TemplateRef<any>;
    /**
     * The name of the template used to contain expandable content for each item
     */
    expandTemplate: TemplateRef<any>;
    /**
     * The event emitted when an action (e.g., button, kebab, etc.) has been selected
     */
    onActionSelect: EventEmitter<{}>;
    /**
     * The event emitted when a checkbox has been selected
     */
    onCheckboxChange: EventEmitter<{}>;
    /**
     * The event emitted when an item has been clicked
     */
    onClick: EventEmitter<{}>;
    /**
     * The event emitted when an item is double clicked
     */
    onDblClick: EventEmitter<{}>;
    /**
     * The event emitted when an item is no longer dragged
     */
    /**
     * The event emitted when an item is being dragged
     */
    /**
     * The event emitted when an item begins to be dragged
     */
    /**
     * The event emitted when an item has been selected
     */
    onSelect: EventEmitter<{}>;
    /**
     * The event emitted when an item selection has been changed
     */
    onSelectionChange: EventEmitter<{}>;
    private defaultConfig;
    private dragItem;
    private itemsEmpty;
    private prevConfig;
    /**
     * The default constructor
     */
    constructor();
    /**
     *  Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     *  Check if the component config has changed
     */
    ngDoCheck(): void;
    private setupConfig();
    private handleAction(action);
    private checkboxChange(item);
    private isSelected(item);
    private dragEnd();
    private dragMoved();
    private isDragOriginal(item);
    private dragStart(item);
    private itemClick($event, item);
    private dblClick($event, item);
    private closeExpandArea(item);
    private toggleExpandArea(item);
}
