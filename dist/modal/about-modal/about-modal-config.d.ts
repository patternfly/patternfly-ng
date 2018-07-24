/**
 * A config containing properties for about modal
 */
export declare class AboutModalConfig {
    /**
     * Text explaining the version or copyright
     */
    additionalInfo?: string;
    /**
     * Product copyright information
     */
    copyright?: string;
    /**
     * The alt text for the corner graphic
     */
    logoImageAlt?: string;
    /**
     * The source for the corner graphic
     */
    logoImageSrc?: string;
    /**
     * data for the modal:
     *  .product - the product label
     *  .version - the product version
     */
    productInfo?: Array<object>;
    /**
     * The product title for the modal
     */
    title?: string;
}
