import { NgModule } from '@angular/core';
import { SearchHighlightPipe } from './search-highlight/search-highlight.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';

/**
 * A module containing objects associated with the truncate pipe
 */
@NgModule({
  declarations: [
    SearchHighlightPipe,
    TruncatePipe
  ],
  exports: [
    SearchHighlightPipe,
    TruncatePipe
  ]
})
export class PipeModule { }
