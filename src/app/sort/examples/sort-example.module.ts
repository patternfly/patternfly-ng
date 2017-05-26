import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { DropdownConfig, TabsModule, TabsetConfig } from 'ng2-bootstrap';
import { SortModule } from '../sort.module';
import { SortExampleComponent } from './sort-example.component';

@NgModule({
  imports: [ CommonModule, DemoComponentsModule, FormsModule, SortModule, TabsModule ],
  declarations: [ SortExampleComponent ],
  exports: [ SortExampleComponent ],
  providers: [ DropdownConfig, TabsetConfig ]
})
export class SortExampleModule {
  constructor() {}
}
