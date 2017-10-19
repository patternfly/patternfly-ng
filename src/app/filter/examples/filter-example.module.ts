import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { FilterModule } from '../filter.module';
import { FilterBasicExampleComponent } from './filter-basic-example.component';
import { FilterExampleComponent } from './filter-example.component';
import { FilterLazyExampleComponent } from './filter-lazy-example.component';
import { FilterTypeAheadExampleComponent } from './filter-type-ahead-example.component';

@NgModule({
  imports: [CommonModule, DemoComponentsModule, FilterModule, FormsModule, TabsModule.forRoot()],
  declarations: [
    FilterBasicExampleComponent,
    FilterExampleComponent,
    FilterLazyExampleComponent,
    FilterTypeAheadExampleComponent
  ],
  providers: [TabsetConfig]
})
export class FilterExampleModule {
  constructor() {}
}
