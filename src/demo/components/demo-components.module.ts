import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncludeContentComponent } from './includeContent.component';

@NgModule({
  imports:      [ CommonModule ],
  exports: [ IncludeContentComponent ],
  declarations: [ IncludeContentComponent ]
})
export class DemoComponentsModule {
  constructor() {}
}
