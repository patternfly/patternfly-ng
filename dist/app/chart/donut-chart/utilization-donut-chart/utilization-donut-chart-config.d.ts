import { DonutChartBaseConfig } from '../donut-chart-base-config';
/**
 * A config containing properties for the utilization donut chart
 */
export declare class UtilizationDonutChartConfig extends DonutChartBaseConfig {
    /**
     * Used portion of the donut arc.
     */
    used: number;
    /**
     * Total portion of the donut arc.
     */
    total: number;
    /**
     * Calculated Available portion of the donut arc.
     */
    available?: number;
    /**
     * Calculated percentage used
     */
    percent?: number;
    /**
     * Units being represented. Ex: 'GB', 'TB', 'Mhz', 'Pods'.
     */
    units?: string;
    /**
     * User defined thresholds.  Ie.: {'warning': 60, 'error': 80}
     */
    thresholds?: any;
    /**
     * Format of the center label. Values: 'used', 'available', 'percent', 'none'.
     */
    centerLabelFormat?: string;
    /**
     * User defined center label text function.  Returns an object with 'title' and 'subTitle' properties
     */
    centerLabelFn?: any;
    /**
     * Outer label alignment: 'left', 'center', 'right'
     */
    outerLabelAlignment?: string;
}
