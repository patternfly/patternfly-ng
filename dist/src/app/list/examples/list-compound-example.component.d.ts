import { OnInit } from '@angular/core';
import { Action } from '../../action/action';
import { ActionConfig } from '../../action/action-config';
import { ListConfig } from '../list-config';
import { ListEvent } from '../list-event';
export declare class ListCompoundExampleComponent implements OnInit {
    actionConfig: ActionConfig;
    actionsText: string;
    allItems: any[];
    items: any[];
    listConfig: ListConfig;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    handleAction($event: Action, item: any): void;
    handleClick($event: ListEvent): void;
}
