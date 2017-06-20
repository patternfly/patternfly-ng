import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { FiltersModule } from '../filters.module';
import { FilterExampleComponent } from './filter-example.component';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsModule,
    FiltersModule,
    FormsModule,
    TabsModule.forRoot()
  ],
  declarations: [ FilterExampleComponent ],
  providers: [ TabsetConfig ]
})
export class FilterExampleModule {
  constructor() {}
}
