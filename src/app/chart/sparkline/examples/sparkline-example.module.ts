import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { ChartModule } from '../../chart.module';
import { SparklineExampleComponent } from './sparkline-example.component';

@NgModule({
  declarations: [SparklineExampleComponent],
  imports: [CommonModule, FormsModule, DemoComponentsModule, ChartModule, TabsModule.forRoot()],
  providers: [TabsetConfig]
})
export class SparklineExampleModule {
  constructor() {}
}
