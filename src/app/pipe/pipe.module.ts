import { NgModule } from '@angular/core';

import { SearchHighlightPipeModule } from './search-highlight/search-highlight.pipe.module';
import { SearchHighlightPipe } from './search-highlight/search-highlight.pipe';
import { SortArrayPipeModule } from './sort-array/sort-array.pipe.module';
import { SortArrayPipe } from './sort-array/sort-array.pipe';
import { TruncatePipeModule } from './truncate/truncate.pipe.module';
import { TruncatePipe } from './truncate/truncate.pipe';

/**
 * A module containing objects associated with pipes
 *
 * @deprecated Use individual module imports
 *
 * import {
 *   SearchHighlightModule,
 *   SortArrayModule,
 *   TruncateModule
 * } from 'patternfly-ng/pipe';
 */
@NgModule({
  imports: [
    SearchHighlightPipeModule,
    SortArrayPipeModule,
    TruncatePipeModule
  ],
  exports: [
    SearchHighlightPipe,
    SortArrayPipe,
    TruncatePipe
  ]
})
export class PipeModule {
  constructor() {
    console.log('patternfly-ng: PipeModule is deprecated; use SearchHighlightModule, ' +
      'SortArrayModule, or TruncateModule');
  }
}
