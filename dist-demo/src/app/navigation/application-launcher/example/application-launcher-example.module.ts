import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { NavigationModule } from '../../navigation.module';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { ApplicationLauncherExampleComponent } from './application-launcher-example.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    RouterModule,
    NavigationModule,
    TabsModule.forRoot()
  ],
  declarations: [ApplicationLauncherExampleComponent],
  exports: [ApplicationLauncherExampleComponent],
  providers: [TabsetConfig]
})
export class ApplicationLauncherExampleModule {
  constructor() {}
}
