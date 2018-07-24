/**
 * A base config containing properties for charts
 */
export declare abstract class ChartConfigBase {
    /**
     * The id of the chart used in the markup
     */
    chartId?: string;
    /**
     * C3 inherited configuration for data
     *
     * See: http://c3js.org/reference.html#data
     */
    data?: any;
}
