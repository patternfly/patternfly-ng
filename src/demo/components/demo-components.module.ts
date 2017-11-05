import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncludeContentComponent } from './includeContent.component';
import { IncludeMarkdownComponent } from './includeMarkdown.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    IncludeContentComponent,
    IncludeMarkdownComponent
  ],
  declarations: [
    IncludeContentComponent,
    IncludeMarkdownComponent
  ]
})
export class DemoComponentsModule {
  constructor() {}
}
