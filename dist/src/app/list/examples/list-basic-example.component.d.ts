import { OnInit, TemplateRef } from '@angular/core';
import { Action } from '../../action/action';
import { ActionConfig } from '../../action/action-config';
import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { ListConfig } from '../list-config';
import { ListEvent } from '../list-event';
export declare class ListBasicExampleComponent implements OnInit {
    actionsText: string;
    allItems: any[];
    emptyStateConfig: EmptyStateConfig;
    items: any[];
    itemsAvailable: boolean;
    listConfig: ListConfig;
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
    getActionConfig(item: any, actionButtonTemplate: TemplateRef<any>, startButtonTemplate: TemplateRef<any>): ActionConfig;
    handleAction($event: Action, item: any): void;
    handleSelect($event: ListEvent): void;
    handleSelectionChange($event: ListEvent): void;
    handleClick($event: ListEvent): void;
    handleDblClick($event: ListEvent): void;
    handleCheckboxChange($event: ListEvent): void;
    updateItemsAvailable(): void;
    updateSelectionType(): void;
}
