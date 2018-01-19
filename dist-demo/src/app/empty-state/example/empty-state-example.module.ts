import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

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
