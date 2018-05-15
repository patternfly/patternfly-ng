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
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { DonutUtilizationConfig } from './donut-utilization-config';
import { DonutComponent } from './donut.component';
/**
 * Donut Utilization chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <code>require('patternfly/dist/js/patternfly-settings');</code>
 */
var DonutUtilizationComponent = /** @class */ (function (_super) {
    __extends(DonutUtilizationComponent, _super);
    function DonutUtilizationComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
    DonutUtilizationComponent.prototype.getCenterLabelText = function () {
        // Public for testing
        this.updateGaugeMetrics();
        var units = this.config.gauge.units;
        var available = this.config.gauge.available;
        var total = this.config.gauge.total;
        var percent = this.config.gauge.percent;
        var used = this.config.gauge.used;
        var labelFormat = this.config.gauge.centerLabelFormat;
        var centerLabelText = {};
        if (this.config.gauge.centerLabelFn) {
            var labelText = this.config.gauge.centerLabelFn();
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
     * get C3 chart data from config.gauge properties
     */
    DonutUtilizationComponent.prototype.getChartData = function () {
        this.updateGaugeMetrics();
        return {
            columns: [
                ['Used', this.config.gauge.used],
                ['Available', this.config.gauge.available]
            ],
            colors: this.getUtilizationColors(),
            groups: [
                ['used', 'available']
            ]
        };
    };
    DonutUtilizationComponent.prototype.updateGaugeMetrics = function () {
        this.config.gauge.available = this.config.gauge.total - this.config.gauge.used;
        this.config.gauge.percent = Math.round(this.config.gauge.used / this.config.gauge.total * 100.0);
    };
    DonutUtilizationComponent.prototype.getUtilizationColors = function () {
        return {
            Used: this.getUtilizationUsedColor(this.config.gauge.percent, this.config.gauge.thresholds),
            Available: this.chartDefaults.getDefaultDonutColors().pattern[1] // grey
        };
    };
    DonutUtilizationComponent.prototype.getUtilizationUsedColor = function (used, thresholds) {
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
    __decorate([
        Input(),
        __metadata("design:type", DonutUtilizationConfig)
    ], DonutUtilizationComponent.prototype, "config", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DonutUtilizationComponent.prototype, "thresholdChanged", void 0);
    DonutUtilizationComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-chart-donut-utilization',
            template: "<div class=\"pct-donut-chart-pf\"><span [ngClass]=\"{'pct-donut-chart-pf-left': config.gauge.outerLabelAlignment === 'left',\n                   'pct-donut-chart-pf-right': config.gauge.outerLabelAlignment === 'right'}\"><span class=\"pct-donut-chart-pf-chart\"><div #chartElement id=\"{{config.chartId}}\"></div></span><span [ngClass]=\"{'text-right': config.gauge.outerLabelAlignment === 'left',\n                      'text-left': config.gauge.outerLabelAlignment === 'right',\n                      'text-center': config.gauge.outerLabelAlignment !== 'left' && config.gauge.outerLabelAlignment !== 'right'}\"><ng-content></ng-content></span></span></div>"
        })
    ], DonutUtilizationComponent);
    return DonutUtilizationComponent;
}(DonutComponent));
export { DonutUtilizationComponent };
//# sourceMappingURL=donut.utilization.component.js.map