import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartDefaults } from '../../chart-defaults';
import { UtilizationDonutChartComponent } from './utilization-donut-chart.component';
import { WindowReference } from '../../../utilities/window.reference';
var UtilizationDonutChartModule = /** @class */ (function () {
    function UtilizationDonutChartModule() {
    }
    UtilizationDonutChartModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [UtilizationDonutChartComponent],
                    exports: [UtilizationDonutChartComponent],
                    providers: [ChartDefaults, WindowReference]
                },] },
    ];
    /** @nocollapse */
    UtilizationDonutChartModule.ctorParameters = function () { return []; };
    return UtilizationDonutChartModule;
}());
export { UtilizationDonutChartModule };
//# sourceMappingURL=utilization-donut-chart.module.js.map