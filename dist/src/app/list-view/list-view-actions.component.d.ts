import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { Action } from '../models/action';
import { ActionConfig } from '../models/action-config';
/**
 * List view actions component.
 *
 * config - The ActionsConfig object containing action properties
 */
export declare class ListViewActionsComponent implements OnInit {
    private el;
    config: ActionConfig;
    onActionSelect: EventEmitter<{}>;
    defaultConfig: ActionConfig;
    isMoreActionsDropup: boolean;
    prevConfig: ActionConfig;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngDoCheck(): void;
    setupConfig(): void;
    handleAction(action: Action): void;
    /**
     * Set flag indicating if kebab should be shown as a dropdown or dropup
     *
     * @param $event The MouseEvent triggering this function
     */
    initMoreActionsDropup($event: MouseEvent): void;
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
