import { OnInit, TemplateRef } from '@angular/core';
/**
 * List view component.
 */
export declare class ListViewCompoundToggleComponent implements OnInit {
    expandingRowId: string;
    item: any;
    template: TemplateRef<any>;
    constructor();
    ngOnInit(): void;
    /**
     * Test if row is expanded based on given expanding row ID
     *
     * @returns {boolean} True if row is expanded
     */
    isRowExpanded(): boolean;
    /**
     * Toggle expanding row open/close
     */
    toggleExpandingRow(): void;
}
