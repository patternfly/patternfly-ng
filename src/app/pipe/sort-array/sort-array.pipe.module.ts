import { NgModule } from '@angular/core';
import { SortArrayPipe } from './sort-array.pipe';

/**
 * A module containing objects associated with the sort array pipe
 */
@NgModule({
  declarations: [
    SortArrayPipe
  ],
  exports: [
    SortArrayPipe
  ]
})
export class SortArrayPipeModule { }
