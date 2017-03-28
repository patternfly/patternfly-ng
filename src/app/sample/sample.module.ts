import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleComponent } from './sample.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ SampleComponent ],
  exports: [ SampleComponent ]
})
export class SampleModule { }
