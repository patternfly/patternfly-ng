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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { cloneDeep, defaults, isEqual, merge } from 'lodash';
import { ChartDefaults } from '../chart.defaults';
import { ChartBase } from '../chart.base';
import { SparklineConfig } from './sparkline-config';
/**
 * Sparkline chart component based on C3
 */
var SparklineComponent = (function (_super) {
    __extends(SparklineComponent, _super);
    /**
     * Default constructor
     * @param chartDefaults
     */
    function SparklineComponent(chartDefaults) {
        var _this = _super.call(this) || this;
        _this.chartDefaults = chartDefaults;
        return _this;
    }
    /**
     * NgOnInit implementation
     */
    SparklineComponent.prototype.ngOnInit = function () {
        // Create an ID for the chart based on the chartId in the config if given
        if (this.sparklineChartId === undefined) {
            this.sparklineChartId = 'sparklineChart';
            if (this.config.chartId) {
                this.sparklineChartId = this.config.chartId + this.sparklineChartId;
            }
        }
        this.setupConfig();
        this.updateAll();
        _super.prototype.generateChart.call(this, this.sparklineChartId);
    };
    /**
     *  Check if the component config has changed
     */
    SparklineComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.chartData, this.prevChartData)) {
            this.updateAll();
        }
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
            this.generateChart(this.sparklineChartId, true);
        }
    };
    /**
     * Tooltip function for sparklines
     * @returns {{contents: ((d:any)=>string), position: ((data:any, width:number, height:number, element:any)=>{top: number, left: number})}}
     */
    SparklineComponent.prototype.sparklineTooltip = function () {
        var _this = this;
        return {
            contents: function (d) {
                var tipRows;
                var percentUsed = 0;
                if (_this.config.tooltipFn) {
                    tipRows = _this.config.tooltipFn(d);
                }
                else {
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
                                    '  <td class="value text-nowrap">' + d[0].value + ' ' + (_this.config.units ? _this.config.units + ' ' : '') + d[0].name + '</td>' +
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
                    center = parseInt(element.getAttribute('x'));
                    top = parseInt(element.getAttribute('y'));
                    chartBox = document.querySelector('#' + _this.sparklineChartId).getBoundingClientRect();
                    graphOffsetX = document.querySelector('#' + _this.sparklineChartId + ' g.c3-axis-y').getBoundingClientRect().right;
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
    /*
     * Convert the config data to C3 Data
     */
    SparklineComponent.prototype.getSparklineData = function (chartData) {
        var sparklineData = {
            type: 'area'
        };
        if (chartData && chartData.dataAvailable !== false && chartData.xData && chartData.yData) {
            sparklineData.x = chartData.xData[0];
            sparklineData.columns = [
                chartData.xData,
                chartData.yData
            ];
        }
        return sparklineData;
    };
    ;
    SparklineComponent.prototype.setupConfig = function () {
        this.defaultConfig = this.chartDefaults.getDefaultSparklineConfig();
        this.defaultConfig.axis = {
            x: {
                show: this.config.showXAxis === true,
                type: 'timeseries',
                tick: {
                    format: function () {
                        return ''; //change to lambda ?
                    }
                }
            },
            y: {
                show: this.config.showYAxis === true,
                tick: {
                    format: function () {
                        return ''; //change to lambda ?
                    }
                }
            }
        };
        // Setup the default configuration
        this.defaultConfig.tooltip = this.sparklineTooltip();
        this.defaultConfig.units = '';
        // Override defaults with callers specifications
        defaults(this.config, this.defaultConfig);
        if (this.config.chartHeight) {
            this.defaultConfig.size.height = this.config.chartHeight;
            this.config.size.height = this.config.chartHeight;
        }
        /*
         * Setup Axis options. Default is to not show either axis. This can be overridden in two ways:
         *   1) in the config, setting showAxis to true will show both axes
         *   2) in the attributes showXAxis and showYAxis will override the config if set
         *
         * By default only line and the tick marks are shown, no labels. This is a sparkline and should be used
         * only to show a brief idea of trending. This can be overridden by setting the config.axis options per C3
         */
        if (this.config.axis) {
            this.config.axis.x.show = this.config.showXAxis === true;
            this.config.axis.y.show = this.config.showYAxis === true;
        }
    };
    SparklineComponent.prototype.updateAll = function () {
        // Need to deep watch changes in chart data
        this.prevChartData = cloneDeep(this.chartData);
        // Convert the given data to C3 chart format
        this.config.data = merge(this.config.data, this.getSparklineData(this.chartData));
    };
    SparklineComponent.prototype.getTooltipTableHTML = function (tipRows) {
        return '<div class="module-triangle-bottom">' +
            '  <table class="c3-tooltip">' +
            '    <tbody>' +
            tipRows +
            '    </tbody>' +
            '  </table>' +
            '</div>';
    };
    return SparklineComponent;
}(ChartBase));
__decorate([
    Input(),
    __metadata("design:type", Object)
], SparklineComponent.prototype, "chartData", void 0);
__decorate([
    Input(),
    __metadata("design:type", SparklineConfig)
], SparklineComponent.prototype, "config", void 0);
SparklineComponent = __decorate([
    Component({
        selector: 'pfng-chart-sparkline',
        template: "<div #chartElement id=\"{{sparklineChartId}}\"></div>"
    }),
    __metadata("design:paramtypes", [ChartDefaults])
], SparklineComponent);
export { SparklineComponent };
//# sourceMappingURL=sparkline.component.js.map