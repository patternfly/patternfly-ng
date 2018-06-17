var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartBase } from './chart-base';
import { ChartConfigBase } from './chart-config-base';
import { ChartDefaults } from './chart-defaults';
import { DonutComponent } from './donut-chart/basic-donut-chart/donut-chart.component';
import { DonutConfig } from './donut-chart/basic-donut-chart/donut-chart-config';
import { DonutChartModule } from './donut-chart/basic-donut-chart/donut-chart.module';
import { SparklineComponent } from './sparkline-chart/sparkline-chart.component';
import { SparklineConfig } from './sparkline-chart/sparkline-chart-config';
import { SparklineData } from './sparkline-chart/sparkline-chart-data';
import { SparklineChartModule } from './sparkline-chart/sparkline-chart.module';
import { WindowReference } from '../utilities/window.reference';
export { ChartBase, ChartConfigBase, ChartDefaults };
// @deprecated Use DonutChartComponent, SparklineChartConfig, and SparklineChartData
export { DonutConfig, SparklineConfig, SparklineData };
/**
 * A module containing objects associated with chart components
 *
 * @deprecated Use individual module imports
 *
 * import {
 *   DonutChartModule,
 *   SparklineChartModule
 * } from 'patterfnly/chart';
 */
var ChartModule = /** @class */ (function () {
    function ChartModule() {
        console.log('patternfly-ng: ChartModule is deprecated; use DonutChartModule or SparklineChartModule');
    }
    ChartModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                DonutChartModule,
                FormsModule,
                SparklineChartModule
            ],
            exports: [DonutComponent, SparklineComponent],
            providers: [ChartDefaults, WindowReference]
        }),
        __metadata("design:paramtypes", [])
    ], ChartModule);
    return ChartModule;
}());
export { ChartModule };
//# sourceMappingURL=chart.module.js.map