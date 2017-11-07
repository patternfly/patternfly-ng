import { ChartConfig } from '../chart-config';
/**
 * A config containing properties for the sparkline chart
 */
export declare class SparklineConfig extends ChartConfig {
    /**
     * An optional function for displaying tooltip content
     */
    tooltipFn?: any;
    /**
     * Options include usagePerDay, valuePerDay, percentage or default
     */
    tooltipType?: string;
    /**
     * The height of the chart
     */
    chartHeight?: number;
    /**
     * Boolean to indicate whether or not to show the x axis
     */
    showXAxis?: boolean;
    /**
     * Boolean to indicate whether or not to show the y axis
     */
    showYAxis?: boolean;
    /**
     * C3 inherited configuration for axis
     */
    axis?: any;
    /**
     * C3 inherited configuration for size object
     */
    size?: any;
    /**
     * The unit of measure for the chart
     */
    units?: string;
    /**
     * C3 inherited configuration for tooltip
     */
    tooltip?: any;
}
