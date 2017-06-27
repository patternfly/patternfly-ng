import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { Action } from '../models/action';
import { ListViewConfig } from './list-view-config';
/**
 * List view component.
 */
export declare class ListViewComponent implements OnInit {
    actionTemplate: TemplateRef<any>;
    config: ListViewConfig;
    itemExpandedTemplate: TemplateRef<any>;
    items: any[];
    itemTemplate: TemplateRef<any>;
    onActionSelect: EventEmitter<{}>;
    onCheckBoxChange: EventEmitter<{}>;
    onClick: EventEmitter<{}>;
    onDblClick: EventEmitter<{}>;
    onDragEnd: EventEmitter<{}>;
    onDragMoved: EventEmitter<{}>;
    onDragStart: EventEmitter<{}>;
    onSelect: EventEmitter<{}>;
    onSelectionChange: EventEmitter<{}>;
    dragItem: any;
    itemsEmpty: boolean;
    prevConfig: ListViewConfig;
    defaultConfig: ListViewConfig;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    setupConfig(): void;
    handleAction(action: Action): void;
    checkBoxChange(item: any): void;
    isSelected(item: any): boolean;
    dragEnd(): void;
    dragMoved(): void;
    isDragOriginal(item: any): boolean;
    dragStart(item: any): void;
    itemClick($event: MouseEvent, item: any): void;
    dblClick($event: MouseEvent, item: any): void;
    closeExpandingRow(item: any): void;
    toggleExpandingRow(item: any): void;
}
