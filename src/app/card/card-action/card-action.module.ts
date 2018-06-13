import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CardAction } from './card-action';
import { CardActionComponent } from './card-action.component';

export {
  CardAction
};

/**
 * A module containing objects associated with card action components
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ CardActionComponent ],
  exports: [ CardActionComponent ]
})
export class CardActionModule {}
