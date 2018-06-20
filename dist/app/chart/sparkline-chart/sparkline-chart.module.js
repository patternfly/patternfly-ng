var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartDefaults } from '../chart-defaults';
import { SparklineChartComponent, SparklineComponent } from './sparkline-chart.component';
import { WindowReference } from '../../utilities/window.reference';
var SparklineChartModule = /** @class */ (function () {
    function SparklineChartModule() {
    }
    SparklineChartModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule
            ],
            declarations: [SparklineChartComponent, SparklineComponent],
            exports: [SparklineChartComponent, SparklineComponent],
            providers: [ChartDefaults, WindowReference]
        })
    ], SparklineChartModule);
    return SparklineChartModule;
}());
export { SparklineChartModule };
//# sourceMappingURL=sparkline-chart.module.js.map