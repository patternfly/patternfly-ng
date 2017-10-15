import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { SearchHighlightModule } from './../search-highlight/search-highlight.module';
import { Filter } from './filter';
import { FilterComponent } from './filter.component';
import { FilterConfig } from './filter-config';
import { FilterEvent } from './filter-event';
import { FilterField } from './filter-field';
import { FilterFieldsComponent } from './filter-fields.component';
import { FilterResultsComponent } from './filter-results.component';
import { FilterQuery } from './filter-query';
import { FilterType } from './filter-type';

export {
  Filter,
  FilterConfig,
  FilterEvent,
  FilterField,
  FilterQuery,
  FilterType
}

/**
 * A module containing objects associated with filter components
 */
@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    FormsModule,
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    SearchHighlightModule
  ],
  declarations: [ FilterComponent, FilterFieldsComponent, FilterResultsComponent ],
  exports: [ FilterComponent, FilterFieldsComponent, FilterResultsComponent ],
  providers: [ BsDropdownConfig, TooltipConfig ]
})
export class FilterModule {}
