import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule }  from '@angular/core';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { SearchHighlightExampleComponent } from './search-highlight-example.component';
import { SearchHighlightPipeModule } from '../search-highlight.pipe.module';

@NgModule({
  declarations: [SearchHighlightExampleComponent],
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    SearchHighlightPipeModule,
    TabsModule.forRoot(),
  ],
  providers: [TabsetConfig]
})
export class SearchHighlightExampleModule {
  constructor() {}
}
