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
import { DonutChartBaseConfig } from '../donut-chart-base-config';
/**
 * A config containing properties for the sparkline chart
 */
var DonutChartConfig = /** @class */ (function (_super) {
    __extends(DonutChartConfig, _super);
    function DonutChartConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DonutChartConfig;
}(DonutChartBaseConfig));
export { DonutChartConfig };
//# sourceMappingURL=donut-chart-config.js.map