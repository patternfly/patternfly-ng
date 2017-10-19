/**
 * A base config containing properties for the  chart
 */
export declare abstract class ChartConfig {
    /**
     * The id of the chart used in the markup
     */
    chartId?: string;
    /**
     * An array of untyped data
     */
    data: any;
    /**
     * C3 configuration id for element to bind to
     */
    bindto?: string;
}
