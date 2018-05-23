/**
 * A config containing properties for copy components
 */
export class CopyConfigBase {
  /**
   * Copy button aria label (announced to screen readers)
   */
  copyBtnAriaLabel?: string;

  /**
   * The text node to be copied
   */
  copyValue?: string;

  /**
   * Tooltip text
   */
  tooltip?: string;

  /**
   * Tooltip text position in relation to the host element
   */
  tooltipPlacement?: string;
}
