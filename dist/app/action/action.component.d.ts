import { DoCheck, ElementRef, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ActionConfig } from './action-config';
/**
 * List actions component.
 *
 * By default, buttons and kebab have no padding so they may inherit stying from components such as list and toolbar.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ActionModule } from 'patternfly-ng/action';
 * // Or
 * import { ActionModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [ActionModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Action, ActionConfig } from 'patternfly-ng/action';
 * </pre></code>
 */
export declare class ActionComponent implements DoCheck, OnInit {
    private el;
    /**
     * The action config containing component properties
     */
    config: ActionConfig;
    /**
     * Action template for custom actions
     */
    template: TemplateRef<any>;
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
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Set up default config
     */
    protected setupConfig(): void;
    private handleAction;
    /**
     * Set flag indicating if kebab should be shown as a dropdown or dropup
     *
     * @param $event The MouseEvent triggering this function
     */
    private initMoreActionsDropup;
    /**
     * Get the closest ancestor based on given selector
     *
     * @param el The HTML element to start searching for matching ancestor
     * @param selector The selector to match
     * @param stopSelector If this selector is matched, the search is stopped
     * @returns {HTMLElement} The matching HTML element or null if not found
     */
    private closest;
}
