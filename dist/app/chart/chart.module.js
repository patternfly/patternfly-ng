var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartDefaults } from './chart-defaults';
import { DonutComponent } from './donut/donut.component';
import { DonutUtilizationComponent } from './donut/donut.utilization.component';
import { DonutConfig } from './donut/donut-config';
import { SparklineComponent } from './sparkline/sparkline.component';
import { SparklineConfig } from './sparkline/sparkline-config';
import { SparklineData } from './sparkline/sparkline-data';
import { WindowReference } from '../utilities/window.reference';
export { DonutConfig, SparklineConfig, SparklineData };
var ChartModule = /** @class */ (function () {
    function ChartModule() {
    }
    ChartModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
            ],
            declarations: [SparklineComponent, DonutComponent, DonutUtilizationComponent],
            exports: [SparklineComponent, DonutComponent, DonutUtilizationComponent],
            providers: [ChartDefaults, WindowReference]
        })
    ], ChartModule);
    return ChartModule;
}());
export { ChartModule };
//# sourceMappingURL=chart.module.js.map