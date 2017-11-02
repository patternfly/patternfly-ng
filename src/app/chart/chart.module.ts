import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SparklineComponent } from './sparkline/sparkline.component';
import { ChartDefaults } from './chart.defaults';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [SparklineComponent],
  exports: [SparklineComponent],
  providers: [ChartDefaults]
})
export class ChartModule {}
