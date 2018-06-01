import { EventEmitter, OnInit } from '@angular/core';
import { CardAction } from './card-action';
/**
 * Card action component
 *
 * Usage:
 * <br/><code>import { CardActionModule } from 'patternfly-ng/card';</code>
 *
 * Or:
 * <br/><code>import { CardActionModule } from 'patternfly-ng';</code>
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
    private select($event);
}
