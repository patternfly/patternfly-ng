import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { PipeModule } from '../../pipe.module';
import { SearchHighlightExampleComponent } from './search-highlight-example.component';

@NgModule({
  declarations: [SearchHighlightExampleComponent],
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    PipeModule,
    TabsModule.forRoot(),
  ],
  providers: [TabsetConfig]
})
export class SearchHighlightExampleModule {
  constructor() {}
}
