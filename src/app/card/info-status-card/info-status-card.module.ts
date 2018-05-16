import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { InfoStatusCardConfig } from './info-status-card-config';
import { InfoStatusCardComponent } from './info-status-card.component';

export {
  InfoStatusCardConfig
};

/**
 * A module containing objects associated with info status card components
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [InfoStatusCardComponent],
  exports: [InfoStatusCardComponent]
})
export class InfoStatusCardModule {}
