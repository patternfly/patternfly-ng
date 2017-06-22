import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { FiltersModule } from '../filters/filters.module';
import { SortModule } from '../sort/sort.module';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarConfig } from './toolbar-config';

export {
  ToolbarConfig
}

@NgModule({
  imports: [ BsDropdownModule, CommonModule, FiltersModule, SortModule ],
  declarations: [ ToolbarComponent ],
  exports: [ ToolbarComponent ],
  providers: [ BsDropdownConfig ]
})
export class ToolbarModule { }
