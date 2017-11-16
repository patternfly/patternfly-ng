import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { PipeModule } from '../../pipe.module';
import { TruncateExampleComponent } from './truncate-example.component';

@NgModule({
  declarations: [ TruncateExampleComponent ],
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    PipeModule,
    TabsModule.forRoot()
  ],
  providers: [ TabsetConfig ]
})
export class TruncateExampleModule {
  constructor() {}
}
