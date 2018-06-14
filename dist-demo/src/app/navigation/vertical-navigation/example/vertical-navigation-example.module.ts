import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NavigationModule } from '../../navigation.module';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { VerticalNavigationExampleComponent } from './vertical-navigation-example.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    RouterModule,
    NavigationModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  declarations: [VerticalNavigationExampleComponent],
  exports: [VerticalNavigationExampleComponent],
  providers: [TabsetConfig, BsDropdownConfig]
})
export class VerticalNavigationExampleModule {
  constructor() {}
}
