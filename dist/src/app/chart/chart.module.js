var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SparklineComponent } from './sparkline/sparkline.component';
import { ChartDefaults } from './chart.defaults';
var ChartModule = (function () {
    function ChartModule() {
    }
    return ChartModule;
}());
ChartModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
        ],
        declarations: [SparklineComponent],
        exports: [SparklineComponent],
        providers: [ChartDefaults]
    })
], ChartModule);
export { ChartModule };
//# sourceMappingURL=chart.module.js.map