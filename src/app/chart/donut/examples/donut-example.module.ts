import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { ChartModule } from '../../chart.module';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { DonutExampleComponent } from './donut-example.component';

@NgModule({
  declarations: [DonutExampleComponent],
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
