/**
 * A config containing properties for About Modal
 */
export class AboutModalConfig {
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
  imgAlt?: string;

  /**
   * The source for the corner graphic
   */
  imgSrc?: string;

  /**
   * Flag indicating that the modal should be opened
   */
  isOpen?: boolean;

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

