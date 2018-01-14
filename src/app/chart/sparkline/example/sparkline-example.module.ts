import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';

import { ChartModule } from '../../chart.module';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { SparklineExampleComponent } from './sparkline-example.component';

@NgModule({
  declarations: [SparklineExampleComponent],
  imports: [
    CommonModule,
    FormsModule,
    DemoComponentsModule,
    ChartModule,
    TabsModule.forRoot()
  ],
  providers: [TabsetConfig]
})
export class SparklineExampleModule {
  constructor() {}
}
