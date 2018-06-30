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
import { Input, } from '@angular/core';
import { cloneDeep, defaultsDeep, isEqual, merge, uniqueId } from 'lodash';
import * as d3 from 'd3';
import { ChartBase } from '../chart-base';
/**
 * Donut base
 */
var DonutChartBaseComponent = /** @class */ (function (_super) {
    __extends(DonutChartBaseComponent, _super);
    /**
     * Default constructor
     * @param chartDefaults
     */
    function DonutChartBaseComponent(chartDefaults, windowRef) {
        var _this = _super.call(this) || this;
        _this.chartDefaults = chartDefaults;
        _this.windowRef = windowRef;
        _this.subscriptions = [];
        _this.subscriptions.push(_this.chartLoaded.subscribe({
            next: function (chart) {
                _this.chartAvailable(chart);
            }
        }));
        return _this;
    }
    /**
     * Setup component configuration upon initialization
     */
    DonutChartBaseComponent.prototype.ngOnInit = function () {
        this.setupConfigDefaults();
        this.setupConfig();
        this.generateChart(this.config);
    };
    /**
     * Check if the component config has changed
     */
    DonutChartBaseComponent.prototype.ngDoCheck = function () {
        var dataChanged = !isEqual(this.chartData, this.prevChartData);
        if (dataChanged || !isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
            this.generateChart(this.config, !dataChanged);
        }
    };
    /**
     * Clean up subscriptions
     */
    DonutChartBaseComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe; });
    };
    /**
     * Set up default config
     */
    DonutChartBaseComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaultsDeep(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config.chartHeight !== undefined) {
            this.config.size.height = this.config.chartHeight;
        }
        this.config.data = merge(this.config.data, this.getChartData());
        this.prevConfig = cloneDeep(this.config);
        this.prevChartData = cloneDeep(this.chartData);
    };
    /**
     * Set up default config
     */
    DonutChartBaseComponent.prototype.setupConfigDefaults = function () {
        this.defaultConfig = this.chartDefaults.getDefaultDonutConfig();
        this.defaultConfig.chartId = uniqueId();
        this.defaultConfig.data = {
            type: 'donut',
            order: null
        };
        this.defaultConfig.donut = this.chartDefaults.getDefaultDonut();
        this.defaultConfig.tooltip = { contents: (this.windowRef.nativeWindow).patternfly.pfDonutTooltipContents };
    };
    /**
     * Convert chartData to C3 data property
     */
    DonutChartBaseComponent.prototype.getChartData = function () {
        return {
            columns: this.chartData,
            colors: this.config.colors
        };
    };
    /**
     * Returns an object containing center label properties
     * @returns {any}
     */
    DonutChartBaseComponent.prototype.getCenterLabelText = function () {
        // Public for testing
        var centerLabelText = {
            title: this.getTotal(),
            subTitle: this.config.donut.title
        };
        if (this.config.centerLabel) {
            centerLabelText.title = this.config.centerLabel;
            centerLabelText.subTitle = '';
        }
        return centerLabelText;
    };
    // Private
    DonutChartBaseComponent.prototype.chartAvailable = function (chart) {
        this.setupDonutChartTitle(chart);
    };
    DonutChartBaseComponent.prototype.getTotal = function () {
        var total = 0;
        if (this.config.data !== undefined && this.config.data.columns !== undefined) {
            this.config.data.columns.forEach(function (element) {
                if (!isNaN(element[1])) {
                    total += Number(element[1]);
                }
            });
        }
        return total;
    };
    DonutChartBaseComponent.prototype.setupDonutChartTitle = function (chart) {
        var donutChartTitle, centerLabelText;
        if (chart === undefined) {
            return;
        }
        donutChartTitle = d3.select(chart.element).select('text.c3-chart-arcs-title');
        if (donutChartTitle === undefined) {
            return;
        }
        centerLabelText = this.getCenterLabelText();
        donutChartTitle.text('');
        if (centerLabelText.title && !centerLabelText.subTitle) {
            donutChartTitle.text(centerLabelText.title);
        }
        else {
            donutChartTitle.insert('tspan', null).text(centerLabelText.title)
                .classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
            donutChartTitle.insert('tspan', null).text(centerLabelText.subTitle).
                classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
        }
    };
    DonutChartBaseComponent.propDecorators = {
        'chartData': [{ type: Input },],
        'config': [{ type: Input },],
    };
    return DonutChartBaseComponent;
}(ChartBase));
export { DonutChartBaseComponent };
//# sourceMappingURL=donut-chart-base.component.js.map