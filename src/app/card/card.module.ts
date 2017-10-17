import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CardConfig } from './basic-card/card-config';
import { CardComponent } from './basic-card/card.component';
import { CardAction } from './card-action/card-action';
import { CardActionComponent } from './card-action/card-action.component';
import { CardBase } from './card-base';
import { CardBaseConfig } from './card-base-config';
import { CardFilter } from './card-filter/card-filter';
import { CardFilterPosition } from './card-filter/card-filter-position';
import { CardFilterComponent } from './card-filter/card-filter.component';

export { CardAction, CardBase, CardBaseConfig, CardConfig, CardFilter, CardFilterPosition };

/**
 * A module containing objects associated with card components
 */
@NgModule({
  imports: [BsDropdownModule.forRoot(), CommonModule, FormsModule],
  declarations: [CardActionComponent, CardComponent, CardFilterComponent],
  exports: [CardComponent, CardFilterComponent],
  providers: [BsDropdownConfig]
})
export class CardModule {}
