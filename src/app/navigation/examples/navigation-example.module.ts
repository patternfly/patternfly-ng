import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { NavigationModule } from '../navigation.module';
import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { SimpleVerticalNavigationExampleComponent } from './simple-vertical-navigation-example.component';
import { VerticalNavigationExampleComponent } from './vertical-navigation-example.component';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    NavigationModule,
    TabsModule.forRoot()
  ],
  declarations: [ VerticalNavigationExampleComponent, SimpleVerticalNavigationExampleComponent ],
  exports: [ VerticalNavigationExampleComponent, SimpleVerticalNavigationExampleComponent ],
  providers: [ TabsetConfig ]
})
export class NavigationExampleModule {
  constructor() {}
}
