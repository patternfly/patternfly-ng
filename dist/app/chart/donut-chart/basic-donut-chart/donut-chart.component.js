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
    DonutChartComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-donut-chart',
            template: "<div #chartElement id=\"{{config.chartId}}\"></div>"
        }),
        __metadata("design:paramtypes", [ChartDefaults, WindowReference])
    ], DonutChartComponent);
    return DonutChartComponent;
}(DonutChartBaseComponent));
export { DonutChartComponent };
/**
 * @deprecated Use DonutChartComponent
 */
var DonutComponent = /** @class */ (function (_super) {
    __extends(DonutComponent, _super);
    function DonutComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DonutComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-chart-donut',
            template: "<div #chartElement id=\"{{config.chartId}}\"></div>"
        })
    ], DonutComponent);
    return DonutComponent;
}(DonutChartComponent));
export { DonutComponent };
//# sourceMappingURL=donut-chart.component.js.map