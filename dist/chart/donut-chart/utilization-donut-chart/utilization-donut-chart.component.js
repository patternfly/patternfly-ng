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
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ChartDefaults } from '../../chart-defaults';
import { DonutChartBaseComponent } from '../donut-chart-base.component';
import { WindowReference } from '../../../utilities/window.reference';
/**
 * Donut Utilization chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from PatternFly.
 * <code><pre>
 * require('patternfly/dist/js/patternfly-settings');
 * </pre></code>
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { UtilizationDonutChartModule } from 'patternfly-ng/chart';
 * // Or
 * import { UtilizationDonutChartModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [UtilizationDonutChartModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { UtilizationDonutChartConfig } from 'patternfly-ng/chart';
 * </pre></code>
 */
var UtilizationDonutChartComponent = /** @class */ (function (_super) {
    __extends(UtilizationDonutChartComponent, _super);
    /**
     * Default constructor
     */
    function UtilizationDonutChartComponent(chartDefaults, windowRef) {
        var _this = _super.call(this, chartDefaults, windowRef) || this;
        _this.chartDefaults = chartDefaults;
        _this.windowRef = windowRef;
        /**
         * Event emitted when the Used amount passes a user defined threshold
         * @type {EventEmitter}
         */
        _this.thresholdChanged = new EventEmitter();
        return _this;
    }
    /**
     * Returns an object containing center label properties
     * @returns {any}
     */
    UtilizationDonutChartComponent.prototype.getCenterLabelText = function () {
        // Public for testing
        this.updateMetrics();
        var units = this.config.units;
        var available = this.config.available;
        var total = this.config.total;
        var percent = this.config.percent;
        var used = this.config.used;
        var labelFormat = this.config.centerLabelFormat;
        var centerLabelText = {};
        if (this.config.centerLabelFn) {
            var labelText = this.config.centerLabelFn();
            centerLabelText.title = labelText.title;
            centerLabelText.subTitle = labelText.subTitle;
        }
        else {
            switch (labelFormat) {
                case 'none':
                    centerLabelText.title = '';
                    centerLabelText.subTitle = '';
                    break;
                case 'available':
                    centerLabelText.title = available;
                    centerLabelText.subTitle = units + ' Available';
                    break;
                case 'percent':
                    centerLabelText.title = percent + '%';
                    centerLabelText.subTitle = 'of ' + total + ' ' + units;
                    break;
                default:
                    centerLabelText.title = used;
                    centerLabelText.subTitle = units + ' Used';
            }
        }
        return centerLabelText;
    };
    /**
     * get C3 chart data from config properties
     */
    UtilizationDonutChartComponent.prototype.getChartData = function () {
        this.updateMetrics();
        return {
            columns: [
                ['Used', this.config.used],
                ['Available', this.config.available]
            ],
            colors: this.getUtilizationColors(),
            groups: [
                ['used', 'available']
            ]
        };
    };
    UtilizationDonutChartComponent.prototype.updateMetrics = function () {
        this.config.available = this.config.total - this.config.used;
        this.config.percent = Math.round(this.config.used / this.config.total * 100.0);
    };
    UtilizationDonutChartComponent.prototype.getUtilizationColors = function () {
        return {
            Used: this.getUtilizationUsedColor(this.config.percent, this.config.thresholds),
            Available: this.chartDefaults.getDefaultDonutColors().pattern[1] // grey
        };
    };
    UtilizationDonutChartComponent.prototype.getUtilizationUsedColor = function (used, thresholds) {
        var threshold = 'none';
        var thresholdColors = this.chartDefaults.getDefaultRelationshipDonutColors().pattern;
        var color = thresholdColors[0]; // default blue
        var errorColor = thresholdColors[1]; // red
        var warnColor = thresholdColors[2]; // orange
        var okColor = thresholdColors[3]; // green
        if (thresholds) {
            threshold = 'ok';
            color = okColor;
            if (used >= thresholds.error) {
                threshold = 'error';
                color = errorColor;
            }
            else if (used >= thresholds.warning) {
                threshold = 'warning';
                color = warnColor;
            }
        }
        if (!this.threshold || this.threshold !== threshold) {
            this.threshold = threshold;
            this.thresholdChanged.emit(this.threshold);
        }
        return color;
    };
    UtilizationDonutChartComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-utilization-donut-chart',
                    template: "<div class=\"pct-donut-chart-pf\"><span [ngClass]=\"{'pct-donut-chart-pf-left': config.outerLabelAlignment === 'left',\n                   'pct-donut-chart-pf-right': config.outerLabelAlignment === 'right'}\"><span class=\"pct-donut-chart-pf-chart\"><div #chartElement id=\"{{config.chartId}}\"></div></span><span [ngClass]=\"{'text-right': config.outerLabelAlignment === 'left',\n                      'text-left': config.outerLabelAlignment === 'right',\n                      'text-center': config.outerLabelAlignment !== 'left' && config.outerLabelAlignment !== 'right'}\"><ng-content></ng-content></span></span></div>"
                },] },
    ];
    /** @nocollapse */
    UtilizationDonutChartComponent.ctorParameters = function () { return [
        { type: ChartDefaults, },
        { type: WindowReference, },
    ]; };
    UtilizationDonutChartComponent.propDecorators = {
        'config': [{ type: Input },],
        'thresholdChanged': [{ type: Output },],
    };
    return UtilizationDonutChartComponent;
}(DonutChartBaseComponent));
export { UtilizationDonutChartComponent };
//# sourceMappingURL=utilization-donut-chart.component.js.map