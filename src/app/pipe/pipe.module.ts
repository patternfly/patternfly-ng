import { NgModule } from '@angular/core';
import { SearchHighlightPipe } from './search-highlight/search-highlight.pipe';
import { SortArrayPipe } from './sort-array/sort-array.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';

/**
 * A module containing objects associated with pipes
 */
@NgModule({
  declarations: [
    SearchHighlightPipe,
    SortArrayPipe,
    TruncatePipe
  ],
  exports: [
    SearchHighlightPipe,
    SortArrayPipe,
    TruncatePipe
  ]
})
export class PipeModule { }
