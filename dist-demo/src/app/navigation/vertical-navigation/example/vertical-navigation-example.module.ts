import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { VerticalNavigationExampleComponent } from './vertical-navigation-example.component';
import { VerticalNavigationModule } from '../vertical-navigation.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    RouterModule,
    TabsModule.forRoot(),
    VerticalNavigationModule
  ],
  declarations: [VerticalNavigationExampleComponent],
  exports: [VerticalNavigationExampleComponent],
  providers: [TabsetConfig, BsDropdownConfig]
})
export class VerticalNavigationExampleModule {
  constructor() {}
}
