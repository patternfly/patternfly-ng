import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartDefaults } from './chart.defaults';
import { SparklineComponent } from './sparkline/sparkline.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SparklineComponent],
  exports: [SparklineComponent],
  providers: [ChartDefaults]
})
export class ChartModule {}
