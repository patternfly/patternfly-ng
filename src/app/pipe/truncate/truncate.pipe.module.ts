import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate.pipe';

/**
 * A module containing objects associated with the truncate pipe
 */
@NgModule({
  declarations: [
    TruncatePipe
  ],
  exports: [
    TruncatePipe
  ]
})
export class TruncatePipeModule { }
