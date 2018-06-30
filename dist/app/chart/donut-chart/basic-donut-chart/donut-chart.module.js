import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartDefaults } from '../../chart-defaults';
import { DonutChartComponent } from './donut-chart.component';
import { WindowReference } from '../../../utilities/window.reference';
var DonutChartModule = /** @class */ (function () {
    function DonutChartModule() {
    }
    DonutChartModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [DonutChartComponent],
                    exports: [DonutChartComponent],
                    providers: [ChartDefaults, WindowReference]
                },] },
    ];
    /** @nocollapse */
    DonutChartModule.ctorParameters = function () { return []; };
    return DonutChartModule;
}());
export { DonutChartModule };
//# sourceMappingURL=donut-chart.module.js.map