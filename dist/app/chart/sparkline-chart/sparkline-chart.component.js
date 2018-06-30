var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaultsDeep, isEqual, merge, uniqueId } from 'lodash';
import { ChartBase } from '../chart-base';
import { ChartDefaults } from '../chart-defaults';
/**
 * Sparkline chart component
 *
 * Note: In order to use charts, please include the following JavaScript file from PatternFly.
 * <code><pre>
 * require('patternfly/dist/js/patternfly-settings');
 * </pre></code>
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SparklineChartModule } from 'patternfly-ng/chart';
 * // Or
 * import { SparklineChartModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SparklineChartModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { SparklineChartConfig, SparklineChartData } from 'patternfly-ng/chart';
 * </pre></code>
 */
var SparklineChartComponent = /** @class */ (function (_super) {
    __extends(SparklineChartComponent, _super);
    /**
     * Default constructor
     * @param chartDefaults
     */
    function SparklineChartComponent(chartDefaults) {
        var _this = _super.call(this) || this;
        _this.chartDefaults = chartDefaults;
        return _this;
    }
    /**
     * Setup component configuration upon initialization
     */
    SparklineChartComponent.prototype.ngOnInit = function () {
        this.setupConfigDefaults();
        this.setupConfig();
        this.generateChart(this.config, true);
    };
    /**
     * Check if the component config has changed
     */
    SparklineChartComponent.prototype.ngDoCheck = function () {
        var dataChanged = !isEqual(this.chartData, this.prevChartData);
        if (dataChanged || !isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
            this.generateChart(this.config, !dataChanged);
        }
    };
    /**
     * Set up default config
     */
    SparklineChartComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaultsDeep(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        /*
         * Setup Axis options. Default is to not show either axis. This can be overridden in two ways:
         *   1) in the config, setting showAxis to true will show both axes
         *   2) in the attributes showXAxis and showYAxis will override the config if set
         *
         * By default only line and the tick marks are shown, no labels. This is a sparkline and should be used
         * only to show a brief idea of trending. This can be overridden by setting the config.axis options per C3
         */
        if (this.config.axis !== undefined) {
            this.config.axis.x.show = this.config.showXAxis === true;
            this.config.axis.y.show = this.config.showYAxis === true;
        }
        if (this.config.chartHeight !== undefined) {
            this.config.size.height = this.config.chartHeight;
        }
        this.config.data = merge(this.config.data, this.getChartData());
        this.prevConfig = cloneDeep(this.config);
        this.prevChartData = cloneDeep(this.chartData);
    };
    /**
     * Set up config defaults
     */
    SparklineChartComponent.prototype.setupConfigDefaults = function () {
        this.defaultConfig = this.chartDefaults.getDefaultSparklineConfig();
        this.defaultConfig.axis = {
            x: {
                show: this.config.showXAxis === true,
                type: 'timeseries',
                tick: {
                    format: function () {
                        return ''; // change to lambda ?
                    }
                }
            },
            y: {
                show: this.config.showYAxis === true,
                tick: {
                    format: function () {
                        return ''; // change to lambda ?
                    }
                }
            }
        };
        this.defaultConfig.chartId = uniqueId(this.config.chartId);
        this.defaultConfig.data = { type: 'area' };
        this.defaultConfig.tooltip = this.tooltip();
        this.defaultConfig.units = '';
    };
    // Chart
    /**
     * Convert chartData to C3 data property
     */
    SparklineChartComponent.prototype.getChartData = function () {
        var data = {};
        if (this.chartData && this.chartData.dataAvailable !== false && this.chartData.xData && this.chartData.yData) {
            data.x = this.chartData.xData[0];
            data.columns = [
                this.chartData.xData,
                this.chartData.yData
            ];
        }
        return data;
    };
    /**
     * Tooltip function for sparklines
     *
     * @returns {{contents: ((d:any)=>string), position: ((data:any, width:number,
     *            height:number, element:any)=>{top: number, left: number})}}
     */
    SparklineChartComponent.prototype.tooltip = function () {
        var _this = this;
        return {
            contents: function (d) {
                var tipRows;
                var percentUsed = 0;
                switch (_this.config.tooltipType) {
                    case 'usagePerDay':
                        if (_this.chartData.dataAvailable !== false && _this.chartData.total > 0) {
                            percentUsed = Math.round(d[0].value / _this.chartData.total * 100.0);
                        }
                        tipRows =
                            '<tr>' +
                                '  <th colspan="2">' + d[0].x.toLocaleDateString() + '</th>' +
                                '</tr>' +
                                '<tr>' +
                                '  <td class="name">' + percentUsed + '%:' + '</td>' +
                                '  <td class="value text-nowrap">' + d[0].value + ' '
                                + (_this.config.units ? _this.config.units + ' ' : '') + d[0].name + '</td>' +
                                '</tr>';
                        break;
                    case 'valuePerDay':
                        tipRows =
                            '<tr>' +
                                '  <td class="value">' + d[0].x.toLocaleDateString() + '</td>' +
                                '  <td class="value text-nowrap">' + d[0].value + ' ' + d[0].name + '</td>' +
                                '</tr>';
                        break;
                    case 'percentage':
                        percentUsed = Math.round(d[0].value / _this.chartData.total * 100.0);
                        tipRows =
                            '<tr>' +
                                '  <td class="name">' + percentUsed + '%' + '</td>' +
                                '</tr>';
                        break;
                    default:
                        tipRows = _this.chartDefaults.getDefaultSparklineTooltip().contents(d);
                }
                return _this.getTooltipTableHTML(tipRows);
            },
            position: function (data, width, height, element) {
                var center;
                var top;
                var chartBox;
                var graphOffsetX;
                var x;
                try {
                    center = parseInt(element.getAttribute('x'), 10);
                    top = parseInt(element.getAttribute('y'), 10);
                    chartBox = document.querySelector('#' + _this.config.chartId).getBoundingClientRect();
                    graphOffsetX = document.querySelector('#' + _this.config.chartId + ' g.c3-axis-y')
                        .getBoundingClientRect().right;
                    x = Math.max(0, center + graphOffsetX - chartBox.left - Math.floor(width / 2));
                    return {
                        top: top - height,
                        left: Math.min(x, chartBox.width - width)
                    };
                }
                catch (e) {
                }
            }
        };
    };
    // Private
    SparklineChartComponent.prototype.getTooltipTableHTML = function (tipRows) {
        return '<div class="module-triangle-bottom">' +
            '  <table class="c3-tooltip">' +
            '    <tbody>' +
            tipRows +
            '    </tbody>' +
            '  </table>' +
            '</div>';
    };
    SparklineChartComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-sparkline-chart',
                    template: "<div #chartElement id=\"{{config.chartId}}\"></div>"
                },] },
    ];
    /** @nocollapse */
    SparklineChartComponent.ctorParameters = function () { return [
        { type: ChartDefaults, },
    ]; };
    SparklineChartComponent.propDecorators = {
        'chartData': [{ type: Input },],
        'config': [{ type: Input },],
    };
    return SparklineChartComponent;
}(ChartBase));
export { SparklineChartComponent };
//# sourceMappingURL=sparkline-chart.component.js.map