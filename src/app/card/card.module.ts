import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CardAction } from './card-action/card-action';
import { CardActionComponent } from './card-action/card-action.component';
import { CardBase } from './card-base';
import { CardBaseConfig } from './card-base-config';
import { CardComponent } from './basic-card/card.component';
import { CardConfig } from './basic-card/card-config';
import { CardFilter } from './card-filter/card-filter';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { CardFilterPosition } from './card-filter/card-filter-position';
import { InfoStatusCardConfig } from './info-status-card/info-status-card-config';
import { InfoStatusCardComponent } from './info-status-card/info-status-card.component';

export {
  CardAction,
  CardBase,
  CardBaseConfig,
  CardConfig,
  CardFilter,
  CardFilterPosition,
  InfoStatusCardConfig
};

/**
 * A module containing objects associated with card components
 */
@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  declarations: [CardActionComponent, CardComponent, CardFilterComponent, InfoStatusCardComponent],
  exports: [CardComponent, CardFilterComponent, InfoStatusCardComponent],
  providers: [BsDropdownConfig]
})
export class CardModule {}
