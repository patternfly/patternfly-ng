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
 * Note: In order to use charts, please include the following JavaScript file from PatternFly.
 * <code><pre>
 * require('patternfly/dist/js/patternfly-settings');
 * </pre></code>
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { DonutChartModule } from 'patternfly-ng/chart';
 * // Or
 * import { DonutChartModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [DonutChartModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { DonutChartConfig } from 'patternfly-ng/chart';
 * </pre></code>
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
//# sourceMappingURL=donut-chart.component.js.map