import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ChartDefaults } from '../../chart-defaults';
import { UtilizationDonutChartComponent } from './utilization-donut-chart.component';
import { WindowReference } from '../../../utilities/window.reference';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [UtilizationDonutChartComponent],
  exports: [UtilizationDonutChartComponent],
  providers: [ChartDefaults, WindowReference]
})
export class UtilizationDonutChartModule {}
