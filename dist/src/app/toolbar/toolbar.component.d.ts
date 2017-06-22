import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { Action } from '../models/action';
import { Filter } from '../filters/filter';
import { FilterEvent } from '../filters/filter-event';
import { SortEvent } from '../sort/sort-event';
import { ToolbarConfig } from './toolbar-config';
import { View } from '../models/view';
/**
 * Standard toolbar component. Includes filtering and view selection capabilities
 */
export declare class ToolbarComponent implements OnInit {
    config: ToolbarConfig;
    actionsTemplate: TemplateRef<any>;
    viewsTemplate: TemplateRef<any>;
    onActionSelect: EventEmitter<{}>;
    onFilterFiledSelect: EventEmitter<{}>;
    onFilterChange: EventEmitter<{}>;
    onFilterTypeAhead: EventEmitter<{}>;
    onSortChange: EventEmitter<{}>;
    onViewSelect: EventEmitter<{}>;
    defaultConfig: ToolbarConfig;
    prevConfig: ToolbarConfig;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    setupConfig(): void;
    handleAction(action: Action): void;
    clearFilter($event: Filter[]): void;
    filterAdded($event: FilterEvent): void;
    filterExists(filter: Filter): boolean;
    handleFilterFieldSelect($event: FilterEvent): void;
    handleFilterTypeAhead($event: FilterEvent): void;
    sortChange($event: SortEvent): void;
    isViewSelected(view: View): boolean;
    submit($event: any): void;
    viewSelected(view: View): void;
    private enforceSingleSelect(filter);
}
