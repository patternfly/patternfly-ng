import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RemainingCharsDirective } from './remaining-chars.directive';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ RemainingCharsDirective ],
  exports: [ RemainingCharsDirective ]
})
export class RemainingCharsModule { }
