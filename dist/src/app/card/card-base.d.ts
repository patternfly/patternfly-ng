import { TemplateRef } from '@angular/core';
/**
 * Card base component
 *
 * For customization, use the templates named headerTemplate and footerTemplate.
 */
export declare abstract class CardBase {
    /**
     * The name of the template containing footer layout
     */
    footerTemplate: TemplateRef<any>;
    /**
     * The name of the template containing header layout
     */
    headerTemplate: TemplateRef<any>;
    /**
     * The default constructor
     */
    constructor();
}
