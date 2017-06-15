import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { RemainingCharsModule } from '../remaining-chars.module';
import { RemainingCharsExampleComponent } from './remaining-chars-example.component';

@NgModule({
  declarations: [ RemainingCharsExampleComponent ],
  imports: [
    CommonModule,
    DemoComponentsModule,
    RemainingCharsModule,
    TabsModule.forRoot(),
  ],
  providers: [ TabsetConfig ]
})
export class RemainingCharsExampleModule {
  constructor() {}
}
