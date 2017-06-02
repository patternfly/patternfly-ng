import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SampleModule } from './src/app/sample/sample.module';
import { SortModule } from './src/app/sort/sort.module';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
  ],
  exports: [
    SampleModule,
    SortModule
  ]
})
export class PatternFlyNgModule {
}
