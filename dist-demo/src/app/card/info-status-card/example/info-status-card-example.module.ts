import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { InfoStatusCardModule } from '../info-status-card.module';
import { InfoStatusCardExampleComponent } from './info-status-card-example.component';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';

@NgModule({
  declarations: [
    InfoStatusCardExampleComponent
  ],
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    InfoStatusCardModule,
    TabsModule.forRoot()
  ],
  providers: [TabsetConfig]
})
export class InfoStatusCardExampleModule {
  constructor() {}
}
