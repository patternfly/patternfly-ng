import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { SearchHighlightModule } from './../search-highlight/search-highlight.module';
import { Filter } from './filter';
import { FilterConfig } from './filter-config';
import { FilterEvent } from './filter-event';
import { FilterField } from './filter-field';
import { FilterFieldsComponent } from './filter-fields.component';
import { FilterQuery } from './filter-query';
import { FilterResultsComponent } from './filter-results.component';
import { FilterComponent } from './filter.component';

export { Filter, FilterConfig, FilterEvent, FilterField, FilterQuery };

/**
 * A module containing objects associated with filter components
 */
@NgModule({
  imports: [BsDropdownModule.forRoot(), CommonModule, FormsModule, TooltipModule.forRoot(), SearchHighlightModule],
  declarations: [FilterComponent, FilterFieldsComponent, FilterResultsComponent],
  exports: [FilterComponent, FilterFieldsComponent, FilterResultsComponent],
  providers: [BsDropdownConfig, TooltipConfig]
})
export class FilterModule {}
