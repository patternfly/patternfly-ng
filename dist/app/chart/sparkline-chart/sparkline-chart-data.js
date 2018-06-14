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
/**
 * A base config containing properties for chart data
 */
var SparklineChartData = /** @class */ (function () {
    function SparklineChartData() {
    }
    return SparklineChartData;
}());
export { SparklineChartData };
/**
 * @deprecated Use SparklineChartData
 */
var SparklineData = /** @class */ (function (_super) {
    __extends(SparklineData, _super);
    function SparklineData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SparklineData;
}(SparklineChartData));
export { SparklineData };
//# sourceMappingURL=sparkline-chart-data.js.map