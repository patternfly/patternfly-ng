import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { ChartModule } from '../../../chart/chart.module';
import { CardModule } from '../../card.module';
import { CardBasicExampleComponent } from './card-basic-example.component';
import { CardCustomExampleComponent } from './card-custom-example.component';
import { CardExampleComponent } from './card-example.component';
import { CardTrendExampleComponent } from './card-trend-example.component';

@NgModule({
  declarations: [
    CardBasicExampleComponent,
    CardCustomExampleComponent,
    CardExampleComponent,
    CardTrendExampleComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CardModule,
    ChartModule,
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    TabsModule.forRoot()
  ],
  providers: [BsDropdownConfig, TabsetConfig]
})
export class CardExampleModule {
  constructor() {}
}
