import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { SortModule } from '../sort.module';
import { SortExampleComponent } from './sort-example.component';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    SortModule,
    TabsModule.forRoot()
  ],
  declarations: [SortExampleComponent],
  exports: [SortExampleComponent],
  providers: [TabsetConfig]
})
export class SortExampleModule {
  constructor() {}
}
