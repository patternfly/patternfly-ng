import { Injectable } from '@angular/core';
var ChartDefaults = /** @class */ (function () {
    function ChartDefaults() {
        this.patternflyDefaults = window.patternfly.c3ChartDefaults();
        this.getDefaultColors = this.patternflyDefaults.getDefaultColors;
        this.getDefaultDonut = this.patternflyDefaults.getDefaultDonut;
        this.getDefaultDonutSize = this.patternflyDefaults.getDefaultDonutSize;
        this.getDefaultDonutColors = this.patternflyDefaults.getDefaultDonutColors;
        this.getDefaultRelationshipDonutColors = this.patternflyDefaults.getDefaultRelationshipDonutColors;
        this.getDefaultDonutLegend = this.patternflyDefaults.getDefaultDonutLegend;
        this.getDefaultDonutTooltip = this.patternflyDefaults.getDefaultDonutTooltip;
        this.getDefaultDonutConfig = this.patternflyDefaults.getDefaultDonutConfig;
        this.getDefaultSparklineArea = this.patternflyDefaults.getDefaultSparklineArea;
        this.getDefaultSparklineSize = this.patternflyDefaults.getDefaultSparklineSize;
        this.getDefaultSparklineAxis = this.patternflyDefaults.getDefaultSparklineAxis;
        this.getDefaultSparklineColor = this.patternflyDefaults.getDefaultColors;
        this.getDefaultSparklineLegend = this.patternflyDefaults.getDefaultSparklineLegend;
        this.getDefaultSparklinePoint = this.patternflyDefaults.getDefaultSparklinePoint;
        this.getDefaultSparklineTooltip = this.patternflyDefaults.getDefaultSparklineTooltip;
        this.getDefaultSparklineConfig = this.patternflyDefaults.getDefaultSparklineConfig;
        this.getDefaultLineConfig = this.patternflyDefaults.getDefaultLineConfig;
    }
    ChartDefaults.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ChartDefaults.ctorParameters = function () { return []; };
    return ChartDefaults;
}());
export { ChartDefaults };
//# sourceMappingURL=chart-defaults.js.map