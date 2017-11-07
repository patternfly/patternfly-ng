var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var ChartDefaults = (function () {
    function ChartDefaults() {
        this.patternflyDefaults = window.patternfly.c3ChartDefaults();
        this.getDefaultColors = this.patternflyDefaults.getDefaultColors;
        this.getDefaultDonut = this.patternflyDefaults.getDefaultDonut;
        this.getDefaultDonutSize = this.patternflyDefaults.getDefaultDonutSize;
        this.getDefaultDonutColor = this.patternflyDefaults.getDefaultDonutColors;
        this.getDefaultDonutLegend = this.patternflyDefaults.getDefaultDonutLegend;
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
    return ChartDefaults;
}());
ChartDefaults = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ChartDefaults);
export { ChartDefaults };
//# sourceMappingURL=chart.defaults.js.map