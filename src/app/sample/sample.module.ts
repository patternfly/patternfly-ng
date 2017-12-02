import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SampleComponent } from './sample.component';

/**
 * A module containing objects associated with the sample component
 */
@NgModule({
  imports: [CommonModule],
  declarations: [SampleComponent],
  exports: [SampleComponent]
})
export class SampleModule {}
