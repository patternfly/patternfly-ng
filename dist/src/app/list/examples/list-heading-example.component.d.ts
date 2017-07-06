import { OnInit } from '@angular/core';
import { Action } from '../../models/action';
import { ActionConfig } from '../../models/action-config';
import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { ListConfig } from '../list-config';
import { ListEvent } from '../list-event';
export declare class ListHeadingExampleComponent implements OnInit {
    actionConfig: ActionConfig;
    actionsText: string;
    allItems: any[];
    emptyStateConfig: EmptyStateConfig;
    items: any[];
    listConfig: ListConfig;
    selectType: string;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    handleAction($event: Action, item: any): void;
    handleSelect($event: ListEvent): void;
    handleSelectionChange($event: ListEvent): void;
    handleClick($event: ListEvent): void;
    handleDblClick($event: ListEvent): void;
    handleCheckboxChange($event: ListEvent): void;
    updateSelectionType(): void;
}
