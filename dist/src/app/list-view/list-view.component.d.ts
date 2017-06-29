import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ListViewConfig } from './list-view-config';
/**
 * List view component
 *
 * For items, use a template named itemTemplate to contain content for each row. For each item in the items array, the
 * expansion can be disabled by setting disabled to true on the item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each row. If using expanding rows, use a template
 * named itemExpandedTemplate to contain expandable content for each row.
 */
export declare class ListViewComponent implements OnInit {
    /**
     * The name of the template containing actions for each row
     */
    actionTemplate: TemplateRef<any>;
    /**
     * The list view config containing component properties
     */
    config: ListViewConfig;
    /**
     * The name of the template used to contain expandable content for each row
     */
    itemExpandedTemplate: TemplateRef<any>;
    /**
     * An array of items to display in the list view
     */
    items: any[];
    /**
     * The name of the template containing items for each row
     */
    itemTemplate: TemplateRef<any>;
    /**
     * The event emitted when an action (e.g., button, kebab, etc.) has been selected
     */
    onActionSelect: EventEmitter<{}>;
    /**
     * The event emitted when a row checkbox has been selected
     */
    onCheckBoxChange: EventEmitter<{}>;
    /**
     * The event emitted when a row has been clicked
     */
    onClick: EventEmitter<{}>;
    /**
     * The event emitted when a row is double clicked
     */
    onDblClick: EventEmitter<{}>;
    /**
     * The event emitted when a row is no longer dragged
     */
    /**
     * The event emitted when a row is being dragged
     */
    /**
     * The event emitted when a row begins to be dragged
     */
    /**
     * The event emitted when a row has been selected
     */
    onSelect: EventEmitter<{}>;
    /**
     * The event emitted when a row selection has been changed
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
    private checkBoxChange(item);
    private isSelected(item);
    private dragEnd();
    private dragMoved();
    private isDragOriginal(item);
    private dragStart(item);
    private itemClick($event, item);
    private dblClick($event, item);
    private closeExpandingRow(item);
    private toggleExpandingRow(item);
}
