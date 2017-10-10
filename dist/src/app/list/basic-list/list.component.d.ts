import { DoCheck, OnInit, TemplateRef } from '@angular/core';
import { ListBase } from '../list-base';
import { ListConfig } from './list-config';
/**
 * List component
 *
 * For items, use a template named itemTemplate to contain content for each item. For each item in the items array, the
 * expansion can be disabled by setting disabled to true on the item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each item. If using expand items, use a template
 * named itemExpandedTemplate to contain expandable content for each item.
 *
 * Cannot use both multi-select and double click selection at the same time
 * Cannot use both checkbox and click selection at the same time
 */
export declare class ListComponent extends ListBase implements DoCheck, OnInit {
    /**
     * The list config containing component properties
     */
    config: ListConfig;
    /**
     * The name of the template used to contain expandable content for each item
     */
    expandTemplate: TemplateRef<any>;
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
     * @returns {} ListConfig The component config
     */
    protected getConfig(): ListConfig;
    private closeExpandArea(item);
    private toggleExpandArea(item);
}
