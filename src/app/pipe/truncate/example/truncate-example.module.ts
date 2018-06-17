import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule }  from '@angular/core';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { TruncateExampleComponent } from './truncate-example.component';
import { TruncatePipeModule } from '../truncate.pipe.module';

@NgModule({
  declarations: [TruncateExampleComponent],
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    TabsModule.forRoot(),
    TruncatePipeModule
  ],
  providers: [TabsetConfig]
})
export class TruncateExampleModule {
  constructor() {}
}
