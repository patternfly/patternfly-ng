import { DoCheck, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ListBase } from '../list-base';
import { TreeListConfig } from './tree-list-config';
/**
 * Tree List component
 *
 * For items, use a template named itemTemplate to contain content for each item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each item. Use the loadTemplate to customize lazy
 * loading messages.
 *
 * Cannot use both multi-select and double click selection at the same time
 * Cannot use both checkbox and click selection at the same time
 *
 * For angular-tree-component options, see: https://angular2-tree.readme.io/docs
 */
export declare class TreeListComponent extends ListBase implements DoCheck, OnInit {
    /**
     * The tree list config containing component properties
     */
    config: TreeListConfig;
    /**
     * The name of the template containing loading layout
     */
    loadTemplate: TemplateRef<any>;
    /**
     * Catch-all event that is triggered for angular-tree-component
     */
    onEvent: EventEmitter<{}>;
    /**
     * This event is fired any time moveNode is called for angular-tree-component
     */
    onMoveNode: EventEmitter<{}>;
    /**
     * Triggers when expanding / collapsing angular-tree-component nodes
     */
    onToggleExpanded: EventEmitter<{}>;
    /**
     * The underlying tree for angular-tree-component
     */
    private tree;
    private defaultConfig;
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
    /**
     * Set up default config
     */
    protected setupConfig(): void;
    /**
     * Return component config
     *
     * @returns {TreeListConfig} The component config
     */
    protected getConfig(): TreeListConfig;
    /**
     * Helper to update angular-tree-component model
     *
     * After adding or removing nodes from the tree, the update method must be called
     * on the treeModel for it to take affect.
     *
     * See: https://angular2-tree.readme.io/docs/changing-the-tree
     */
    update(): void;
    private handleDragStart($event);
    private handleEvent($event);
    private handleMoveNode($event);
    private handleToggleExpanded($event);
    /**
     * Get children indent in pixels
     *
     * @param {number} nodeLevel The level of the given node in the tree
     * @returns {string} The indent in pixels
     */
    private getIndentChildren(nodeLevel);
}
