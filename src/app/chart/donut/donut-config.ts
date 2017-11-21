import { ChartConfig } from '../chart-config';
/**
 * A config containing properties for the sparkline chart
 */
export class DonutConfig extends ChartConfig {

  /**
   * An optional function to customize the text of the center label
   */
  centerLabelFn?: any;

  /**
   * An optional function to handle when donut is clicked
   */
  onClickFn?: any;

  /**
   * The height of the donut chart
   */
  chartHeight?: number;

  /**
   * C3 inherited configuration for colors
   */
  colors?: any;

  /**
   * C3 inherited configuration for size
   */
  size?: any;

  /**
   * C3 inherited donut configuration
   */
  donut?: any;
}
