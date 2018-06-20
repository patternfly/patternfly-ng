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
 * A base config containing properties for charts
 */
var ChartConfigBase = /** @class */ (function () {
    function ChartConfigBase() {
    }
    return ChartConfigBase;
}());
export { ChartConfigBase };
/**
 * @deprecated Use ChartConfigBase
 */
var ChartConfig = /** @class */ (function (_super) {
    __extends(ChartConfig, _super);
    function ChartConfig() {
        var _this = _super.call(this) || this;
        console.log('patternfly-ng: ChartConfig is deprecated; use ChartConfigBase');
        return _this;
    }
    return ChartConfig;
}(ChartConfigBase));
export { ChartConfig };
//# sourceMappingURL=chart-config-base.js.map