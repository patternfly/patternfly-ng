import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CardAction } from '../card-action/card-action';
import { CardActionModule } from '../card-action/card-action.module';
import { CardComponent } from '../basic-card/card.component';
import { CardConfig } from '../basic-card/card-config';
import { CardFilter } from '../card-filter/card-filter';
import { CardFilterModule } from '../card-filter/card-filter.module';
import { CardFilterPosition } from '../card-filter/card-filter-position';

export {
  CardAction,
  CardConfig,
  CardFilter,
  CardFilterPosition
};

/**
 * A module containing objects associated with basic card components
 */
@NgModule({
  imports: [
    CardActionModule,
    CardFilterModule,
    CommonModule,
    FormsModule
  ],
  declarations: [CardComponent],
  exports: [CardComponent]
})
export class CardModule {}
