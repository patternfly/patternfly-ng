import { OnInit, TemplateRef } from '@angular/core';
import { Action } from '../../models/action';
import { ActionConfig } from '../../models/action-config';
import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { ListViewConfig } from '../list-view-config';
import { ListViewEvent } from '../list-view-event';
export declare class ListViewBasicExampleComponent implements OnInit {
    actionConfig: ActionConfig;
    actionsText: string;
    allItems: any[];
    emptyStateConfig: EmptyStateConfig;
    items: any[];
    itemsAvailable: boolean;
    listViewConfig: ListViewConfig;
    selectType: string;
    showDisabledRows: boolean;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    /**
     * Get the ActionConfig properties for each row
     *
     * @param item The current row item
     * @param actionButtonTemplate {TemplateRef} Custom button template
     * @param startButtonTemplate {TemplateRef} Custom button template
     * @returns {ActionConfig}
     */
    getActionsConfig(item: any, actionButtonTemplate: TemplateRef<any>, startButtonTemplate: TemplateRef<any>): ActionConfig;
    handleAction($event: Action, item: any): void;
    handleSelect($event: ListViewEvent): void;
    handleSelectionChange($event: ListViewEvent): void;
    handleClick($event: ListViewEvent): void;
    handleDblClick($event: ListViewEvent): void;
    handleCheckBoxChange($event: ListViewEvent): void;
    updateDisabledRows(): void;
    updateItemsAvailable(): void;
    updateSelectionType(): void;
}
