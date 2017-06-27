import { EventEmitter, OnInit } from '@angular/core';
import { Action } from '../models/action';
import { EmptyStateConfig } from './empty-state-config';
/**
 * Empty state component.
 */
export declare class EmptyStateComponent implements OnInit {
    config: EmptyStateConfig;
    onActionSelect: EventEmitter<{}>;
    defaultConfig: EmptyStateConfig;
    prevConfig: EmptyStateConfig;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    setupConfig(): void;
    handleAction(action: Action): void;
}
