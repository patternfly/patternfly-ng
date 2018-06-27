import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { CardModule } from '../card.module';
import { CardBasicExampleComponent } from './card-basic-example.component';
import { CardCustomExampleComponent } from './card-custom-example.component';
import { CardExampleComponent } from './card-example.component';
import { CardTrendExampleComponent } from './card-trend-example.component';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { SparklineChartModule } from '../../../chart/sparkline-chart/sparkline-chart.module';

@NgModule({
  declarations: [
    CardBasicExampleComponent,
    CardCustomExampleComponent,
    CardExampleComponent,
    CardTrendExampleComponent
  ],
  imports: [
    CardModule,
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    SparklineChartModule,
    TabsModule.forRoot()
  ],
  providers: [TabsetConfig]
})
export class CardExampleModule {
  constructor() {}
}
