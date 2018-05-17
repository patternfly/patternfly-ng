import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CardFilter } from './card-filter';
import { CardFilterComponent } from './card-filter.component';
import { CardFilterPosition } from './card-filter-position';

export {
  CardFilter,
  CardFilterPosition
};

/**
 * A module containing objects associated with card filter components
 */
@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  declarations: [CardFilterComponent],
  exports: [CardFilterComponent],
  providers: [BsDropdownConfig]
})
export class CardFilterModule {}
