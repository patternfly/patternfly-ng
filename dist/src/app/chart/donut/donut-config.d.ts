import { ChartConfig } from '../chart-config';
/**
 * A config containing properties for the sparkline chart
 */
export declare class DonutConfig extends ChartConfig {
    /**
     * Text for the donut chart center label (optional)
     */
    centerLabel?: any;
    /**
     * An optional function to handle when donut is clicked
     */
    onClickFn?: any;
    /**
     * The height of the donut chart (optional)
     */
    chartHeight?: number;
    /**
     * C3 inherited configuration for colors
     * An object with key-value pairs of data name and color, e.g.
     * colors : {
     *   Cats: '#0088ce',
     *   Hamsters: '#3f9c35',
     * }
     *
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
    /**
     * C3 inherited configuration for tooltip
     */
    tooltip?: any;
}
