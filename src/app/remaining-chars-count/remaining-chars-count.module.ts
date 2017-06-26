import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RemainingCharsCountDirective } from './remaining-chars-count.directive';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ RemainingCharsCountDirective ],
  exports: [ RemainingCharsCountDirective ]
})
export class RemainingCharsCountModule { }
