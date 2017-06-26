import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { FilterModule } from '../filter/filter.module';
import { SortModule } from '../sort/sort.module';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarConfig } from './toolbar-config';

export {
  ToolbarConfig
}

@NgModule({
  imports: [ BsDropdownModule, CommonModule, FilterModule, SortModule ],
  declarations: [ ToolbarComponent ],
  exports: [ ToolbarComponent ],
  providers: [ BsDropdownConfig ]
})
export class ToolbarModule { }
