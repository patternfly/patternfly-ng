import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ActionConfig } from '../models/action-config';
/**
 * List actions component.
 *
 * config - The ActionsConfig object containing action properties
 */
export declare class ListActionsComponent implements OnInit {
    private el;
    /**
     * The action config containing component properties
     */
    config: ActionConfig;
    /**
     * The event emitted when an action has been selected
     */
    onActionSelect: EventEmitter<{}>;
    private defaultConfig;
    private isMoreActionsDropup;
    private prevConfig;
    /**
     * The default constructor
     *
     * @param el The element reference for this component
     */
    constructor(el: ElementRef);
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
    /**
     * Set flag indicating if kebab should be shown as a dropdown or dropup
     *
     * @param $event The MouseEvent triggering this function
     */
    private initMoreActionsDropup($event);
    /**
     * Get the closest ancestor based on given selector
     *
     * @param el The HTML element to start searching for matching ancestor
     * @param selector The selector to match
     * @param stopSelector If this selector is matched, the search is stopped
     * @returns {HTMLElement} The matching HTML element or null if not found
     */
    private closest(el, selector, stopSelector);
}
