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
import { Component, ViewEncapsulation } from '@angular/core';
import { ChartDefaults } from '../../chart-defaults';
import { DonutChartBaseComponent } from '../donut-chart-base.component';
import { WindowReference } from '../../../utilities/window.reference';
/**
 * Donut chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <br/><code>require('patternfly/dist/js/patternfly-settings');</code>
 *
 * Usage:
 * <br/><code>import { DonutChartModule } from 'patternfly-ng/chart';</code>
 *
 * Or:
 * <br/><code>import { DonutChartModule } from 'patternfly-ng';</code>
 */
var DonutChartComponent = /** @class */ (function (_super) {
    __extends(DonutChartComponent, _super);
    /**
     * Default constructor
     */
    function DonutChartComponent(chartDefaults, windowRef) {
        var _this = _super.call(this, chartDefaults, windowRef) || this;
        _this.chartDefaults = chartDefaults;
        _this.windowRef = windowRef;
        return _this;
    }
    DonutChartComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-donut-chart',
                    template: "<div #chartElement id=\"{{config.chartId}}\"></div>"
                },] },
    ];
    /** @nocollapse */
    DonutChartComponent.ctorParameters = function () { return [
        { type: ChartDefaults, },
        { type: WindowReference, },
    ]; };
    return DonutChartComponent;
}(DonutChartBaseComponent));
export { DonutChartComponent };
/**
 * @deprecated Use DonutChartComponent
 */
var DonutComponent = /** @class */ (function (_super) {
    __extends(DonutComponent, _super);
    function DonutComponent(chartDefaults, windowRef) {
        var _this = _super.call(this, chartDefaults, windowRef) || this;
        _this.chartDefaults = chartDefaults;
        _this.windowRef = windowRef;
        console.log('patternfly-ng: DonutComponent is deprecated; use DonutChartComponent');
        return _this;
    }
    DonutComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-chart-donut',
                    template: "<div #chartElement id=\"{{config.chartId}}\"></div>"
                },] },
    ];
    /** @nocollapse */
    DonutComponent.ctorParameters = function () { return [
        { type: ChartDefaults, },
        { type: WindowReference, },
    ]; };
    return DonutComponent;
}(DonutChartComponent));
export { DonutComponent };
//# sourceMappingURL=donut-chart.component.js.map