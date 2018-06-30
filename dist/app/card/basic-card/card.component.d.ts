import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { CardAction } from '../card-action/card-action';
import { CardBase } from '../card-base';
import { CardConfig } from './card-config';
import { CardFilter } from '../card-filter/card-filter';
/**
 * Card component
 *
 * For customization, use the templates named headerTemplate and footerTemplate.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { CardModule } from 'patternfly-ng/card';
 * // Or
 * import { CardModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [CardModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CardAction, CardConfig, CardFilter, CardFilterPosition } from 'patternfly-ng/card';
 * </pre></code>
 */
export declare class CardComponent extends CardBase implements DoCheck, OnInit {
    /**
     * The card config containing component properties
     */
    config: CardConfig;
    /**
     * The event emitted when an action is selected
     */
    onActionSelect: EventEmitter<{}>;
    /**
     * The event emitted when a filter is selected
     */
    onFilterSelect: EventEmitter<{}>;
    private defaultConfig;
    private prevConfig;
    /**
     * The default constructor
     */
    constructor();
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
    /**
     * Handle the event emitted when an action is selected
     *
     * @param {CardAction} $event The emitted CardAction object
     */
    protected handleActionSelect($event: CardAction): void;
    /**
     * Handle the event emitted when a filter is selected
     *
     * @param {CardFilter} $event The emitted CardFilter object
     */
    protected handleFilterSelect($event: CardFilter): void;
    /**
     * Indicates that the footer should be shown in the footer
     *
     * @returns {boolean} True if the footer should be shown in the footer
     */
    protected readonly showFilterInFooter: boolean;
    /**
     * Indicates that the footer should be shown in the header
     *
     * @returns {boolean} True if the footer should be shown in the header
     */
    protected readonly showFilterInHeader: boolean;
    /**
     * Indicates that the footer should be shown
     *
     * @returns {boolean} True if the footer should be shown
     */
    readonly showFooter: boolean;
    /**
     * Indicates that the header should be shown
     *
     * @returns {boolean} True if the header should be shown
     */
    readonly showHeader: boolean;
}
