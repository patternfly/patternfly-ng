import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { RouterModule } from '@angular/router';
import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { NavigationModule } from '../navigation.module';
import { VerticalNavigationExampleComponent } from './vertical-navigation-example.component';

@NgModule({
  imports: [CommonModule, DemoComponentsModule, FormsModule, RouterModule, NavigationModule, TabsModule.forRoot()],
  declarations: [VerticalNavigationExampleComponent],
  exports: [VerticalNavigationExampleComponent],
  providers: [TabsetConfig]
})
export class NavigationExampleModule {
  constructor() {}
}
