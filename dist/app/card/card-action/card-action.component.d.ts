import { EventEmitter, OnInit } from '@angular/core';
import { CardAction } from './card-action';
/**
 * Card action component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { CardActionModule } from 'patternfly-ng/card';
 * // Or
 * import { CardActionModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [CardActionModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CardAction } from 'patternfly-ng/card';
 * </pre></code>
 */
export declare class CardActionComponent implements OnInit {
    /**
     * The card filters
     */
    action: CardAction;
    /**
     * The event emitted when a filter is selected
     */
    onActionSelect: EventEmitter<{}>;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    private select;
}
