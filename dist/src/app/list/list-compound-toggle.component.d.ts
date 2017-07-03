import { OnInit, TemplateRef } from '@angular/core';
/**
 * List compund expansion toggle component.
 */
export declare class ListCompoundToggleComponent implements OnInit {
    /**
     * The id of the template used to contain expandable content for each row
     */
    expandingRowId: string;
    /**
     * The items displayed in the current list row
     */
    item: any;
    /**
     * The name of the template containing elements shown in the toggle body
     */
    template: TemplateRef<any>;
    /**
     * The default constructor
     */
    constructor();
    /**
     *  Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Test if row is expanded based on given expanding row ID
     *
     * @returns {boolean} True if row is expanded
     */
    private isRowExpanded();
    /**
     * Toggle expanding row open/close
     */
    private toggleExpandingRow();
}
