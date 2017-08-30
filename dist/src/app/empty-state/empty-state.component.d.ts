import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { EmptyStateConfig } from './empty-state-config';
/**
 * Component for rendering an empty state.
 */
export declare class EmptyStateComponent implements DoCheck, OnInit {
    /**
     * The empty state config containing component properties
     */
    config: EmptyStateConfig;
    /**
     * The event emitted when an action is selected
     */
    onActionSelect: EventEmitter<{}>;
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
    private handleAction(action);
}
