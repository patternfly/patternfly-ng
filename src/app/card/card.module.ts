import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CardAction } from './card-action/card-action';
import { CardBase } from './card-base';
import { CardComponent } from './basic-card/card.component';
import { CardConfig } from './basic-card/card-config';
import { CardConfigBase } from './card-config-base';
import { CardFilter } from './card-filter/card-filter';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { CardFilterPosition } from './card-filter/card-filter-position';
import { InfoStatusCardComponent } from './info-status-card/info-status-card.component';
import { InfoStatusCardConfig } from './info-status-card/info-status-card-config';
import { InfoStatusCardModule } from './info-status-card/info-status-card.module';

import { CardActionModule } from './card-action/card-action.module';
import { CardModule as BasicCardModule} from './basic-card/card.module';
import { CardFilterModule } from './card-filter/card-filter.module';

export {
  CardAction,
  CardBase,
  CardConfig,
  CardConfigBase,
  CardFilter,
  CardFilterPosition,
  InfoStatusCardConfig
};

/**
 * A module containing objects associated with card components
 *
 * @deprecated Use BasicCardModule or InfoStatusCardModule
 */
@NgModule({
  imports: [
    BasicCardModule,
    CardActionModule,
    CardFilterModule,
    CommonModule,
    FormsModule,
    InfoStatusCardModule
  ],
  exports: [CardComponent, CardFilterComponent, InfoStatusCardComponent]
})
export class CardModule {}
