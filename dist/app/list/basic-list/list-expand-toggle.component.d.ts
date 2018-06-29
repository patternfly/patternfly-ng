import { OnInit, TemplateRef } from '@angular/core';
/**
 * Helper component for the list compund expansion toggle.
 */
export declare class ListExpandToggleComponent implements OnInit {
    /**
     * The id of the template used to contain expandable content for each item
     */
    expandId: string;
    /**
     * The items displayed in the current list item
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
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Test if item is expanded based on given expand item ID
     *
     * @returns {boolean} True if item is expanded
     */
    readonly isExpanded: boolean;
    /**
     * Toggle expand item open/close
     */
    toggleExpandItem(): void;
}
