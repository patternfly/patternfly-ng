import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { SearchHighlightModule } from '../search-highlight.module';
import { SearchHighlightExampleComponent } from './search-highlight-example.component';

@NgModule({
  declarations: [ SearchHighlightExampleComponent ],
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    SearchHighlightModule,
    TabsModule.forRoot(),
  ],
  providers: [ TabsetConfig ]
})
export class SearchHighlightExampleModule {
  constructor() {}
}
