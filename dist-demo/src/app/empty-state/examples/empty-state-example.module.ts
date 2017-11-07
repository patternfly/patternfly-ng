import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { EmptyStateModule } from '../empty-state.module';
import { EmptyStateExampleComponent } from './empty-state-example.component';

@NgModule({
  declarations: [EmptyStateExampleComponent],
  imports: [
    CommonModule,
    DemoComponentsModule,
    EmptyStateModule,
    TabsModule.forRoot()
  ],
  providers: [TabsetConfig]
})
export class EmptyStateExampleModule {
  constructor() {}
}
