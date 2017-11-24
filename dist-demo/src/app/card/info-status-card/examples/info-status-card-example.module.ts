import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { CardModule } from '../../card.module';
import { InfoStatusCardExampleComponent } from './info-status-card-example.component';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';

@NgModule({
  declarations: [
    InfoStatusCardExampleComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CardModule,
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    TabsModule.forRoot()
  ],
  providers: [ BsDropdownConfig, TabsetConfig ]
})
export class InfoStatusCardExampleModule {
  constructor() {}
}
