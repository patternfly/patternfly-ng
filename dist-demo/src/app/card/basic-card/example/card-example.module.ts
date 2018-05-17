import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { CardModule } from '../card.module';
import { CardBasicExampleComponent } from './card-basic-example.component';
import { CardCustomExampleComponent } from './card-custom-example.component';
import { CardExampleComponent } from './card-example.component';
import { CardTrendExampleComponent } from './card-trend-example.component';
import { ChartModule } from '../../../chart/chart.module';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';

@NgModule({
  declarations: [
    CardBasicExampleComponent,
    CardCustomExampleComponent,
    CardExampleComponent,
    CardTrendExampleComponent
  ],
  imports: [
    CardModule,
    ChartModule,
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    TabsModule.forRoot()
  ],
  providers: [TabsetConfig]
})
export class CardExampleModule {
  constructor() {}
}
