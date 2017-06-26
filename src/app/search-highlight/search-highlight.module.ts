import { NgModule } from '@angular/core';
import { SearchHighlightPipe } from './search-highlight.pipe';

@NgModule({
  declarations: [ SearchHighlightPipe ],
  exports: [ SearchHighlightPipe ]
})
export class SearchHighlightModule { }
