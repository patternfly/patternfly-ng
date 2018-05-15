import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { ChartModule } from '../../chart.module';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { DonutBasicExampleComponent } from './donut-basic-example.component';
import { DonutDynamicExampleComponent } from './donut-dynamic-example.component';
import { DonutUtilizationExampleComponent } from './donut-utilization-example.component';
import { DonutExampleComponent } from './donut-example.component';

@NgModule({
  declarations: [DonutBasicExampleComponent, DonutDynamicExampleComponent, DonutUtilizationExampleComponent,
    DonutExampleComponent],
  imports: [
    ChartModule,
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    TabsModule.forRoot()
  ],
  providers: [TabsetConfig]
})
export class DonutExampleModule {
  constructor() { }
}
