/**
 * An properties for a donut utilization gauge configuration
 */
export declare class DonutGauge {
    /**
     * Used portion of the donut arc/gauge.
     */
    used: number;
    /**
     * Total portion of the donut arc/gauge.
     */
    total: number;
    /**
     * Calculated Available portion of the donut arc/gauge.
     */
    available?: number;
    /**
     * Calculated percentage used
     */
    percent?: number;
    /**
     * Units being gauged. Ex: 'GB', 'TB', 'Mhz', 'Pods'.
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
