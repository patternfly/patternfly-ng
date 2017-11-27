import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { SparklineExampleComponent } from './sparkline-example.component';
import { ChartModule } from '../../chart.module';

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
