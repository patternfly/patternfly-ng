import { OnInit } from '@angular/core';
import { Action } from '../../models/action';
import { ActionsConfig } from '../../models/actions-config';
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
     * @returns {ActionsConfig}
     */
    getActionsConfig(): ActionsConfig;
    handleAction($event: Action, item: any): void;
    handleClick($event: ListViewEvent): void;
}
