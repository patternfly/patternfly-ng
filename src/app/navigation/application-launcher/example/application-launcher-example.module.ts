import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { ApplicationLauncherExampleComponent } from './application-launcher-example.component';
import { ApplicationLauncherModule } from '../application-launcher.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ApplicationLauncherModule,
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    RouterModule,
    TabsModule.forRoot()
  ],
  declarations: [ApplicationLauncherExampleComponent],
  exports: [ApplicationLauncherExampleComponent],
  providers: [TabsetConfig]
})
export class ApplicationLauncherExampleModule {
  constructor() {}
}
