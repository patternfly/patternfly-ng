import { CopyConfigBase } from '../copy-config-base';

/**
 * A config containing properties for block copy
 */
export class BlockCopyConfig extends CopyConfigBase {
  /**
   * Label naming the block copy component
   */
  label?: string;

  /**
   * Copy button text
   */
  buttonLabel?: string;

  /**
   * Controls the expanded state of block copy
   */
  expanded?: boolean;

  /**
   * Expand/toggle button aria label (announced to screen readers)
   */
  expandBtnAriaLabel?: string;

}
