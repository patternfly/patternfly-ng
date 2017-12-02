import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ChartDefaults } from './chart.defaults';
import { DonutComponent } from './donut/donut.component';
import { SparklineComponent } from './sparkline/sparkline.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [SparklineComponent, DonutComponent],
  exports: [SparklineComponent, DonutComponent],
  providers: [ChartDefaults]
})
export class ChartModule {}
