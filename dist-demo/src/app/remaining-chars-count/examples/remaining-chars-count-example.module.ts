import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { RemainingCharsCountModule } from '../remaining-chars-count.module';
import { RemainingCharsCountExampleComponent } from './remaining-chars-count-example.component';

@NgModule({
  declarations: [RemainingCharsCountExampleComponent],
  imports: [
    CommonModule,
    DemoComponentsModule,
    RemainingCharsCountModule,
    TabsModule.forRoot(),
  ],
  providers: [TabsetConfig]
})
export class RemainingCharsCountExampleModule {
  constructor() {}
}
