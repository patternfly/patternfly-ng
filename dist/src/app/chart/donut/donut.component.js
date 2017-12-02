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
import * as d3 from 'd3';
import { cloneDeep, defaults, isEqual, merge, uniqueId } from 'lodash';
import { ChartDefaults } from '../chart.defaults';
import { ChartBase } from '../chart.base';
import { DonutConfig } from './donut-config';
var DonutComponent = /** @class */ (function (_super) {
    __extends(DonutComponent, _super);
    /**
     * Default constructor
     * @param chartDefaults
     */
    function DonutComponent(chartDefaults) {
        var _this = _super.call(this) || this;
        _this.chartDefaults = chartDefaults;
        _this.subscriptions = [];
        return _this;
    }
    DonutComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.config.chartId) {
            throw new Error('DonutComponent: config must have string property chartId');
        }
        this.config.chartId = uniqueId(this.config.chartId);
        this.subscriptions.push(this.chartLoaded.subscribe({
            next: function (chart) {
                _this.chartAvailable(chart);
            }
        }));
        this.setupConfigDefaults();
    };
    DonutComponent.prototype.ngDoCheck = function () {
        if (!isEqual(this.config, this.prevConfig)) {
            this.updateConfig();
            this.generateChart(this.config.chartId, true);
        }
        else if (!isEqual(this.chartData, this.prevChartData)) {
            this.config.data = merge(this.config.data, this.getDonutData(this.chartData));
            this.generateChart(this.config.chartId, false);
            this.prevChartData = cloneDeep(this.chartData);
        }
    };
    DonutComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe; });
    };
    // Public for testing
    DonutComponent.prototype.getCenterLabelText = function () {
        var centerLabelText = {
            bigText: this.getTotal(),
            smText: this.config.donut.title
        };
        if (this.config.centerLabel) {
            centerLabelText.bigText = this.config.centerLabel;
            centerLabelText.smText = '';
        }
        return centerLabelText;
    };
    DonutComponent.prototype.chartAvailable = function (chart) {
        this.setupDonutChartTitle(chart);
    };
    DonutComponent.prototype.getTotal = function () {
        var total = 0;
        this.chartData.forEach(function (element) {
            if (!isNaN(element[1])) {
                total += Number(element[1]);
            }
        });
        return total;
    };
    DonutComponent.prototype.setupDonutChartTitle = function (chart) {
        var donutChartTitle, centerLabelText;
        if (!chart) {
            return;
        }
        donutChartTitle = d3.select(chart.element).select('text.c3-chart-arcs-title');
        if (!donutChartTitle) {
            return;
        }
        centerLabelText = this.getCenterLabelText();
        donutChartTitle.text('');
        if (centerLabelText.bigText && !centerLabelText.smText) {
            donutChartTitle.text(centerLabelText.bigText);
        }
        else {
            donutChartTitle.insert('tspan', null).text(centerLabelText.bigText)
                .classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
            donutChartTitle.insert('tspan', null).text(centerLabelText.smText).
                classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
        }
    };
    DonutComponent.prototype.getDonutData = function (chartData) {
        return {
            type: 'donut',
            columns: this.chartData,
            order: null,
            colors: this.config.colors
        };
    };
    DonutComponent.prototype.setupConfigDefaults = function () {
        var defaultConfig = this.chartDefaults.getDefaultDonutConfig();
        var defaultDonut = this.chartDefaults.getDefaultDonut();
        defaults(this.config, defaultConfig);
        defaults(this.config.donut, defaultDonut);
    };
    DonutComponent.prototype.updateConfig = function () {
        this.config.data = merge(this.config.data, this.getDonutData(this.chartData));
        if (this.config.chartHeight) {
            this.config.size.height = this.config.chartHeight;
        }
        if (this.config.onClickFn) {
            this.config.data.onclick = this.config.onClickFn;
        }
        this.config.tooltip = { contents: window.patternfly.pfDonutTooltipContents };
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DonutComponent.prototype, "chartData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", DonutConfig)
    ], DonutComponent.prototype, "config", void 0);
    DonutComponent = __decorate([
        Component({
            selector: 'pfng-chart-donut',
            template: "<div #chartElement id=\"{{config.chartId}}\"></div>"
        }),
        __metadata("design:paramtypes", [ChartDefaults])
    ], DonutComponent);
    return DonutComponent;
}(ChartBase));
export { DonutComponent };
//# sourceMappingURL=donut.component.js.map