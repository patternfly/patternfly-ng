import { OnInit } from '@angular/core';
import { Action } from '../../models/action';
import { ActionConfig } from '../../models/action-config';
import { ListViewConfig } from '../list-view-config';
import { ListViewEvent } from '../list-view-event';
export declare class ListViewCompoundExampleComponent implements OnInit {
    actionsText: string;
    allItems: any[];
    items: any[];
    listViewConfig: ListViewConfig;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    /**
     * Get the ActionConfig properties for each row
     *
     * @returns {ActionConfig}
     */
    getActionsConfig(): ActionConfig;
    handleAction($event: Action, item: any): void;
    handleClick($event: ListViewEvent): void;
}
